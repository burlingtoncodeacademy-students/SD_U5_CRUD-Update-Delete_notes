const router = require('express').Router();
const Movie = require('../models/movie.model');

// response for catch
const errorResponse = (res, error) => {
    return(
        res.status(500).json({
            error: error.message
        })
    );
};

// response for success
const successResponse = (res, result) => {
    return(
        res.status(200).json({
            result: result
        })
    )
}

// incomplete response
const incompleteResponse = (res) => {
    return(
        res.status(404).json({
            result: `Not found`
        })
    )
}

// create one
router.post('/', async(req,res) => {
    try {
        
        const {
            title,genre,rating,length,releaseYear
        } = req.body;

        const movie = new Movie({
            title,genre,rating,length,releaseYear
        });

        const newMovie = await movie.save();

        successResponse(res,newMovie);

    } catch (err) {
        errorResponse(res,err);
    }
});

// get all movies in database
router.get("/", async(req,res) => {
    try {
        
        const getAllMovies = await Movie.find();

        getAllMovies.length > 0 ?
            successResponse(res, getAllMovies) :
            incompleteResponse(res);

    } catch (err) {
        errorResponse(res,err);
    }
});

// get one movie by id
router.get("/find-one/:id", async(req,res) => {
    try {

        const { id } = req.params;
        const getMovie = await Movie.findOne({ _id: id });

        getMovie ?
            successResponse(res,getMovie) :
            incompleteResponse(res);

    } catch (err) {
        errorResponse(res,err);
    }
});

// get all movies by genre
router.get("/genre/:genre", async(req,res) => {
    try {
        
        const { genre } = req.params;
        let buildWord;

        if(genre) {
            for(let i = 0; i < genre.length; i++) {
                // i === 0 ?
                //     buildWord = genre[i].toUpperCase() :
                //     buildWord = genre[i].toLowerCase();

                if(i === 0) {
                    buildWord = genre[i].toUpperCase();
                } else if(genre[i - 1] === "-") {
                    buildWord += genre[i].toUpperCase();
                } else {
                    buildWord += genre[i].toLowerCase();
                }
            }
        }

        const getMovies = await Movie.find({genre: buildWord});

        getMovies.length > 0 ?
            successResponse(res,getMovies) :
            incompleteResponse(res);

    } catch (err) {
        errorResponse(res,err);
    }
});

//TODO Update One
router.patch('/', async(req,res) => {
    try {
        //1. Pull value from parameter

        //2. PUll data from the body

        //3. Use Schema method to locate document

        //4. Respond to client
        
    } catch (err) {
        errorResponse(res,err);
    }
});

//TODO Delete One
router.delete('/', async(req,res) => {
    try {
        //1. Capture ID

        //2. Use Schema method to locate and delete document

        //3. Repond to client
        
    } catch (err) {
        errorResponse(res,err);
    }
});

module.exports = router;