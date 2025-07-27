const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const app = express();
app.use(cors({
  origin: ['http://localhost:3000'],
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//***************** mongodb ****************** */
const uri = "";
const {MongoClient,ServerApiVersion,ObjectId} = require('mongodb');
const client = new MongoClient(uri, { useNewUrlParser: true });
const customer = client.db('carrentalproject').collection('customer');
const cars = client.db('carrentalproject').collection('cars');
const booking = client.db('carrentalproject').collection('rental');
const testermonial = client.db('carrentalproject').collection('testermonial');
  
//******************* Stripe********************** */
const stripe = require('stripe')('');

//***********************session******************* */

app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false ,
      maxAge: 1000 * 60 * 60 * 24 
    }
  }));
 
  app.get('/', (req, res) => {
    if (req.session.userid) {
      const email=req.session.email;
      return res.json({valid:true , userid: req.session.userid , email:email});
    }else{
      return res.json({valid:false});
    }
  });
  
  //***************** login, logout & register ******************** */
  
  app.post('/register',async(req,res)=>{
    const {username,password,email}=req.body;
  const todaydate=new Date();
  
    try {
      const result = await customer.insertOne({username,password,email,todaydate});
      res.json({success:true ,message:'user registered'});
    } catch (error) {
      res.send(error);
    }
  })
  
  app.post('/login',async (req, res) => {
    const { username, password } = req.body;
    console.log(req.body);
    const user=await customer.findOne({ username, password });
      if (!user) {
        res.json({success:false ,message:'user not found'});
      }else{
      req.session.userid = user._id;
      req.session.email = user.email; 
      res.json({success:true});
      }
    });
  
    app.post('/logout', (req, res) => {
      req.session.destroy((err) => {
        if (err) {
          console.log(err);
        } else {
          res.clearCookie('connect.sid');
          res.json({ success: true, message: 'Logout success' });
        }
      });
    });

//*********************get cars********************* */
app.get('/getcars',async(req,res)=>{
  try {
    const data = await cars.find({status:'available'}).toArray();
    res.send(data);
  } catch (err) {
    console.log(err);
  }
})
app.get('/getcarslist',async(req,res)=>{
  try {
    const data = await cars.find({}).toArray();
    res.send(data);
  } catch (err) {
    console.log(err);
  }
})

//********************** booking form ****************** */
app.post('/booking', async (req, res) => {
  const { carname, price, totalprice, carid, pickupdate, returndate, token, userid } = req.body;
  const milagecal="pending";
  const fullpay='pending'

  try {

  const payment = await stripe.charges.create({
      amount: totalprice * 100,
      currency: 'lkr',
      // customer: customer.id,
      source: token.id,
      // receipt_email: token.email
    // },
    //  { idempotencyKey: uuidv4() 
    });

    if (payment) {
      const transactionId = payment.source.id;
      const bookings = {
        transactionId,
        carname,
        price,
        totalprice,
        carId:new ObjectId(carid),
        pickupdate,
        returndate,
        userId:new ObjectId(userid),
        milagecal,
        fullpay
      };
      await booking.insertOne(bookings);
      await cars.updateOne(
        { _id: new ObjectId(carid) },
        { $set: { status: 'unavailable' } }
      );

      res.json({ success: true, message: 'Booking success' });
    } else {
      res.json({ success: false, message: 'table update fail ' });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Booking failed' });
  }
});


//***************** get booking details ******************* */
app.get('/getbooking',async(req,res)=>{

  const userId = req.session.userid;
  try {
    booking.aggregate([
      {
        $lookup: {
          from: 'cars',
          localField: 'carId',
          foreignField: '_id',
          as: 'car',
        },
      },
      {
          $unwind: '$car'
        },
      {
        $lookup: {
          from: 'customer',
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: '$user',
      },
     
    ]).toArray()
    .then((results) => {
    res.json(results);
    console.log(results);
    });

  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
})

//********************testermonial*********************** */
app.post('/testermonial',async(req,res)=>{
  const {userid,comment}=req.body;
const todaydate=new Date();
  try{
    const result=await testermonial.insertOne({
      comment,
      id:new ObjectId(userid),
      date:todaydate
      
    });
    res.json({success:true ,message:'comment added'});
  }
  catch(error){
    console.log(error);
  }
})

//**********************get testermonial****************** */
app.get('/gettestermonial',async(req,res)=>{
  try {
    testermonial.aggregate([
      {
        $lookup:{
          from:'customer',
          localField:'id',
          foreignField:'_id',
          as:'user'
        }
      },
      {
        $unwind:'$user'
      }
    ]).toArray()
    .then((results)=>{
      res.json(results);
    })
  } catch (err) {
    console.log(err);
  }
}
)

    
//*****************connect to database******************* */
async function connect(){
  try{
      await client.connect();
      console.log('MongoDB connected');
  }catch(err){
      console.log(err);
  }
}

connect().catch(console.error);

app.listen(5001, () => {
  console.log('Listening on port 5001');
}
);
