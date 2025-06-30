import axios from "axios"
import Movie from "../models/Movie.js";
import Show from "../models/Show.js";

//api to get movies from tmdb api
export const getNowPlayingMovies = async (req, res) => {
    try {
        const { data } = await axios.get('https://api.themoviedb.org/3/movie/now_playing', {
            headers: { Authorization: `Bearer ${process.env.TMDB_API_KEY}` }
        })

        const movies = data.results;
        res.json({ success: true, movies: movies })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })

    }
}

//api to add new show to database
export const addShow = async (req, res) => {
    try {
        const { movieId, showsInput, showPrice } = req.body

        let movie = await Movie.findById(movieId);

        if (!movie) {
            //fetch movie details from tmdb
            const [movieDetailsResponse, movieCreditsResponse] = await Promise.all([
                axios.get(`
        https://api.themoviedb.org/3/movie/${movieId}`, {
                    headers: { Authorization: `Bearer ${process.env.TMDB_API_KEY}` }
                }),
                axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
                    headers: { Authorization: `Bearer ${process.env.TMDB_API_KEY}` }
                })
            ]);

            const movieApidata = movieDetailsResponse.data;
            const movieCreditsData = movieCreditsResponse.data;

            const movieDetails = {
                _id: movieId,
                title: movieApidata.title,
                overview: movieApidata.overview,
                poster_path: movieApidata.poster_path,
                backdrop_path: movieApidata.backdrop_path,
                genres: movieApidata.genres,
                casts: movieCreditsData.cast,
                release_date: movieApidata.release_date,
                original_language: movieApidata.original_language,
                tagline: movieApidata.tagline || "",
                vote_average: movieApidata.vote_average,
                runtime: movieApidata.runtime
            }

            movie = await Movie.create(movieDetails);
        }

        const showsToCreate = [];
        showsInput.forEach(show => {
            const showDate = show.date;
            show.time.forEach((time) => {
                const dateTimeString = `${showDate}T${time}`;
                showsToCreate.push({
                    movie: movieId,
                    showDateTime: new Date(dateTimeString),
                    showPrice,
                    occupiedSeats: {}
                })
            })
        })

        if (showsToCreate.length > 0) {
            await Show.insertMany(showsToCreate)
        }

        res.json({ success: true, message: "show added successfully" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// api to get all shows from database
export const getShows = async (req, res) => {
    try {
    
        const shows = await Show.find({showDateTime: { $gte: Date.now() } }).populate('movie').sort({ showDateTime: 1 });
        

        const uniqueShows = new Set(shows.map(show => show.movie))
        res.json({ success: true, shows: Array.from(uniqueShows) })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

//api to get  single shows from database
export const getShow = async (req, res) => {
    try {
        const { movieId } = req.params;

        const shows = await Show.find({ movie: movieId, showDateTime: { $gte: new Date() } })

        const movie = await Movie.findById(movieId);
        const dateTime = {};

        shows.forEach((show) => {
            const date = show.showDateTime.toISOString().split("T")[0];
            if (!dateTime[date]) {
                dateTime[date] = []
            }
            dateTime[date].push({ time: show.showDateTime, showId: show._id })
        })
        res.json({ success: true, movie, dateTime })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}
