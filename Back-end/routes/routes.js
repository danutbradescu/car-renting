const { Router, json } = require('express')

const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')

const User = require('../models/user')

const { async } = require('rxjs')

const Car = require('../SchemaFolder/car-schema')

const router = Router()

router.post('/register', async (req, res) => {
    let email = req.body.email
    let password = req.body.password
    let name = req.body.name

    const salt = await bcrypt.genSalt(10)

    const hashedPassword = await bcrypt.hash(password, salt)

    const record = await User.findOne({ email: email })

    if (record) {
        return res.status(400).send({
            message: "Email deja existent",
        })
    } else {
        const user = new User({
            name: name,
            email: email,
            password: hashedPassword,
        });

        const result = await user.save()

        //JWT Token
        const { _id } = await result.toJSON();

        const token = jwt.sign({ _id: _id }, "secret");

        res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        })


        res.json({
            message: "Succes"
        })
    }
})



router.post("/login", async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return res.status(404).send({
            message: "Cont inexistent!",
        });
    }

    if (!(await bcrypt.compare(req.body.password, user.password))) {
        return res.status(400).send({
            message: "Parola este incorecta",
        });
    }

    const token = jwt.sign({ _id: user._id }, "secret")

    res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 //pentru o zi login
    })

    res.send({
        message: "Succes",
    });

})

router.get('/user', async (req, res) => {
    try {
        const cookie = req.cookies['jwt']

        const claims = jwt.verify(cookie, "secret")

        if (!claims) {
            return res.status(401).send({
                message: "neidentificat"
            })
        }

        const user = await User.findOne({ _id: claims._id })

        const { password, ...data } = await user.toJSON()

        res.send(data)


    } catch (err) {
        return res.status(401).send({
            message: "neidentificat"
        })
    }
});

router.post('/logout', (req, res) => {
    res.cookie("jwt", "", { maxAge: 0 })
    res.send({
        message: "success"
    });
});

router.post('/cars', async(req, res) =>{
    try{
        const car = new Car({
            make:req.body.make,
            model:req.body.model,
            year:req.body.year,
            color:req.body.color,
            pricePerDay: req.body.pricePerDay,
            available:req.body.available,
            photoUrl:req.body.photoUrl,
        });
        const savedCar = await car.save();
        res.json(savedCar);
    }  catch (error) {
        res.status(500).json({ message: 'Failed to create car', error: error.message});
    }
});
// Get car details route
router.get('/cars/:id', async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car) {
            res.status(404).json({ message: 'Car not found' });
        } else {
            res.json(car);
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving car details', error: error.message });
    }
});
router.put('/cars/:id', async (req, res) => {
    try {
        const carId = req.params.id;
        const updatedCar = await Car.findByIdAndUpdate(
            carId,
            {
                $set: {
                    make: req.body.make,
                    model: req.body.model,
                    year: req.body.year,
                    color: req.body.color,
                    pricePerDay: req.body.pricePerDay,
                    available: req.body.available,
                    photoUrl: req.body.photoUrl,
                },
            },
            { new: true } // Return the updated car
        );

        if (!updatedCar) {
            return res.status(404).json({ message: 'Car not found' });
        }

        res.json(updatedCar);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update car', error: error.message });
    }
});

// Delete a car
router.delete('/cars/:id', async (req, res) => {
    try {
        const carId = req.params.id;
        const deletedCar = await Car.findByIdAndDelete(carId);

        if (!deletedCar) {
            return res.status(404).json({ message: 'Car not found' });
        }

        res.json({ message: 'Car deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete car', error: error.message });
    }
});

module.exports = router;