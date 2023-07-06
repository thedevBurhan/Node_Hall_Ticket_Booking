const express= require("express");
// initialize the express server framework
const app =express();
// to get Json data(MiddleWare)
app.use(express.json());

//initlaizing the data
//Question 1:Creating a Room with:
const hallData = [
    {
      id: "1",
      numberOfSeats: 100,
      amenities: ["Ac", "chairs", "discolights"],
      price: 5000,
      ifBooked: "true",
      customerName: "Sanjay",
      date: "05-feb-2022",
      startTime: "10-feb-2022 at 12PM",
      endTime: "11-feb-2020 at 11am",
      RoomId: 201,
      RoomName: "Duplex",
    },
    {
      id: "2",
      numberOfSeats: 100,
      amenities: ["Ac", "chairs", "discolights"],
      price: 5000,
      ifBooked: "false",
      customerName: "",
      date: "",
      startTime: "",
      endTime: "",
      RoomId: 202,
      RoomName: "Duplex",
    },
    {
      id: "3",
      numberOfSeats: 50,
      amenities: ["Ac", "chairs"],
      price: 3000,
      ifBooked: "false",
      customerName: "",
      date: "",
      startTime: "",
      endTime: "",
      RoomId: 203,
      RoomName: "Classic",
    },
    {
      id: "4",
      numberOfSeats: 100,
      amenities: ["Ac", "chairs", "discolights"],
      price: 5000,
      ifBooked: "true",
      customerName: "Suresh",
      date: "03-feb-2022",
      startTime: "15-feb-2022 at 12PM",
      endTime: "16-feb-2020 at 11am",
      RoomId: 204,
      RoomName: "Duplex",
    },
    {
      id: "5",
      numberOfSeats: 200,
      amenities: ["Ac", "chairs", "discolights", "buffet"],
      price: 9000,
      ifBooked: "true",
      customerName: "Vidhya",
      date: "06-feb-2022",
      startTime: "11-feb-2022 at 12PM",
      endTime: "12-feb-2020 at 11am",
      RoomId: 205,
      RoomName: "Suite",
    },
    {
        id: "6",
        numberOfSeats: 200,
        amenities: ["Ac", "chairs", "discolights", "buffet"],
        price: 9000,
        ifBooked: "true",
        customerName: "Vidhya",
        date: "06-feb-2023",
        startTime: "11-May-2022 at 12PM",
        endTime: "12-feb-2023 at 11am",
        RoomId: 206,
        RoomName: "Suite",
      }
  ];
  
app.get("/",(req,res)=>{
    res.send("<h1>Welcome to Hall Ticket Booking</h1>");
})
 
// Creating End-Point hall-details to get hallData
app.get("/hall-details",(req,res)=>{
    res.send(hallData);
})
// Question:2 Booking a Room 
app.put("/edit/hall-details/:id",(req,res)=>{
    const {id}=req.params;
    const halls = hallData.find((hall)=>hall.id === id);
    console.log(halls);
    if(halls.ifBooked === "true"){
        res.status(400).send("This room is already booked");
    }else halls.customerName = req.body.customerName;
    halls.date = req.body.date;
    halls.startTime = req.body.startTime;
    halls.endTime = req.body.endTime;
    res.send(halls);
})
// *****************************************************************************************************************************************************************

//Question 3:List All Room with Booked Data with:
app.get("/hall-details/room-booked",(req,res)=>{
    const {ifBooked}=req.query;
    let filterHalls
    if(ifBooked){
        filterHalls=hallData.filter((halls)=>halls.ifBooked===ifBooked)
        // console.log(filterHalls)
         //  which room are occupied by the customer
         const RoomName = filterHalls.map((hall) => hall.RoomName);
          console.log(`Type of Room Booked: ${RoomName}`);
        return res.send(filterHalls);
    }
    res.send(hallData);
})
// Output:http://localhost:9000//hall-details/room-booked?ifBooked=true
// [
//     {
//         "id": "1",
//         "numberOfSeats": 100,
//         "amenities": [
//             "Ac",
//             "chairs",
//             "discolights"
//         ],
//         "price": 5000,
//         "ifBooked": "true",
//         "customerName": "Sanjay",
//         "date": "05-feb-2022",
//         "startTime": "10-feb-2022 at 12PM",
//         "endTime": "11-feb-2020 at 11am",
//         "RoomId": 201,
//         "RoomName": "Duplex"
//     },
//     {
//         "id": "4",
//         "numberOfSeats": 100,
//         "amenities": [
//             "Ac",
//             "chairs",
//             "discolights"
//         ],
//         "price": 5000,
//         "ifBooked": "true",
//         "customerName": "Suresh",
//         "date": "03-feb-2022",
//         "startTime": "15-feb-2022 at 12PM",
//         "endTime": "16-feb-2020 at 11am",
//         "RoomId": 204,
//         "RoomName": "Duplex"
//     },
//     {
//         "id": "5",
//         "numberOfSeats": 200,
//         "amenities": [
//             "Ac",
//             "chairs",
//             "discolights",
//             "buffet"
//         ],
//         "price": 9000,
//         "ifBooked": "true",
//         "customerName": "Vidhya",
//         "date": "06-feb-2022",
//         "startTime": "11-feb-2022 at 12PM",
//         "endTime": "12-feb-2020 at 11am",
//         "RoomId": 205,
//         "RoomName": "Suite"
//     },
//     {
//         "id": "6",
//         "numberOfSeats": 200,
//         "amenities": [
//             "Ac",
//             "chairs",
//             "discolights",
//             "buffet"
//         ],
//         "price": 9000,
//         "ifBooked": "true",
//         "customerName": "Vidhya",
//         "date": "06-feb-2022",
//         "startTime": "11-feb-2022 at 12PM",
//         "endTime": "12-feb-2020 at 11am",
//         "RoomId": 205,
//         "RoomName": "Suite"
//     }
// ]

// *****************************************************************************************************************************************************************

//Question:4 List All Customer with Booked Data with
app.get("/hall-details/Customer",(req,res)=>{
    const {customerName,ifBooked}=req.query;

    let filterHalls
    if(ifBooked){
        filterHalls=hallData.filter((halls)=>halls.ifBooked===ifBooked)
         // console.log(filterHalls)
          //  Customer who booked Rooms:
         const CustomerName = filterHalls.map((hall) => hall.customerName);
          console.log(`Customer Booked the room: ${CustomerName}`);
        return res.send(filterHalls);
    }
    res.send(hallData);
})
// Output:http://localhost:9000/hall-details/Customer?ifBooked=true
// [
//     {
//         "id": "1",
//         "numberOfSeats": 100,
//         "amenities": [
//             "Ac",
//             "chairs",
//             "discolights"
//         ],
//         "price": 5000,
//         "ifBooked": "true",
//         "customerName": "Sanjay",
//         "date": "05-feb-2022",
//         "startTime": "10-feb-2022 at 12PM",
//         "endTime": "11-feb-2020 at 11am",
//         "RoomId": 201,
//         "RoomName": "Duplex"
//     },
//     {
//         "id": "4",
//         "numberOfSeats": 100,
//         "amenities": [
//             "Ac",
//             "chairs",
//             "discolights"
//         ],
//         "price": 5000,
//         "ifBooked": "true",
//         "customerName": "Suresh",
//         "date": "03-feb-2022",
//         "startTime": "15-feb-2022 at 12PM",
//         "endTime": "16-feb-2020 at 11am",
//         "RoomId": 204,
//         "RoomName": "Duplex"
//     },
//     {
//         "id": "5",
//         "numberOfSeats": 200,
//         "amenities": [
//             "Ac",
//             "chairs",
//             "discolights",
//             "buffet"
//         ],
//         "price": 9000,
//         "ifBooked": "true",
//         "customerName": "Vidhya",
//         "date": "06-feb-2022",
//         "startTime": "11-feb-2022 at 12PM",
//         "endTime": "12-feb-2020 at 11am",
//         "RoomId": 205,
//         "RoomName": "Suite"
//     },
//     {
//         "id": "6",
//         "numberOfSeats": 200,
//         "amenities": [
//             "Ac",
//             "chairs",
//             "discolights",
//             "buffet"
//         ],
//         "price": 9000,
//         "ifBooked": "true",
//         "customerName": "Vidhya",
//         "date": "06-feb-2022",
//         "startTime": "11-feb-2022 at 12PM",
//         "endTime": "12-feb-2020 at 11am",
//         "RoomId": 205,
//         "RoomName": "Suite"
//     }
// ]

// *****************************************************************************************************************************************************************

// Qustion:5 List how many times a customer Has booked the room with below details
app.get("/hall-details/CustomerName",(req,res)=>{
    const {customerName,ifBooked}=req.query;
    let filterHalls
    if(customerName){
        filterHalls=hallData.filter((halls)=>halls.customerName===customerName)
         // console.log(filterHalls)

        //  which room are occupied by the customer
         const RoomId = filterHalls.map((hall) => hall.RoomId);
          console.log(`Room id ${RoomId}`);
        return res.send(filterHalls);
    }
    res.send(hallData);
})
// Output:http://localhost:9000/hall-details/CustomerName?customerName=Vidhya
// [
//     {
//         "id": "5",
//         "numberOfSeats": 200,
//         "amenities": [
//             "Ac",
//             "chairs",
//             "discolights",
//             "buffet"
//         ],
//         "price": 9000,
//         "ifBooked": "true",
//         "customerName": "Vidhya",
//         "date": "06-feb-2022",
//         "startTime": "11-feb-2022 at 12PM",
//         "endTime": "12-feb-2020 at 11am",
//         "RoomId": 205,
//         "RoomName": "Suite"
//     },
//     {
//         "id": "6",
//         "numberOfSeats": 200,
//         "amenities": [
//             "Ac",
//             "chairs",
//             "discolights",
//             "buffet"
//         ],
//         "price": 9000,
//         "ifBooked": "true",
//         "customerName": "Vidhya",
//         "date": "06-feb-2023",
//         "startTime": "11-May-2022 at 12PM",
//         "endTime": "12-feb-2023 at 11am",
//         "RoomId": 206,
//         "RoomName": "Suite"
//     }
// ]

// *****************************************************************************************************************************************************************

// Adding new data in HallData
app.post("/add/hall-details",(req,res)=>{
    const newHall={
        id: hallData.length+1,
        numberOfSeats: req.body.numberOfSeats,
        amenities:req.body.amenities,
        price: req.body.price,
        ifBooked: req.body.ifBooked,
        customerName: req.body.customerName,
        date:req.body.date,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        RoomId: req.body.RoomId,
        RoomName: req.body.RoomName, 
    };
    hallData.push(newHall)
    return res.send(hallData);
});

// Output :http://localhost:9000/add/hall-details  ( In Postman ---- > Post->body->raw->json) //new data
// {
//     "id": 7,
//     "numberOfSeats": 206,
//     "amenities": [
//         "Ac",
//         "chairs",
//         "discolights",
//         "buffet"
//     ],
//     "price": 9000,
//     "ifBooked": "true",
//     "customerName": "Musk",
//     "date": "06-feb-2022",
//     "startTime": "11-May-2020 at 12PM",
//     "endTime": "12-feb-2022 at 11am",
//     "RoomId": 208,
//     "RoomName": "Suite"
// }

// *****************************************************************************************************************************************************************

// To edit a data in HallData
app.put("/edit/hall-details/:id",(req,res)=>{
    const {id}=req.params;
    const halls = hallData.find((hall)=>hall.id === id);
    console.log(halls);
    if(halls.ifBooked === "true"){
        res.status(400).send("This room is already booked");
    }else halls.customerName = req.body.customerName;
    halls.date = req.body.date;
    halls.startTime = req.body.startTime;
    halls.endTime = req.body.endTime;
    res.send(halls);
})




// *****************************************************************************************************************************************************************
// Listen to Server
app.listen(9000,()=>console.log("Server Running in localhost:9000"))