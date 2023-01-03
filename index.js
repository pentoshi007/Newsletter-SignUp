const { response } = require("express")
const express = require("express")
const app = express()
const https = require("https")
const request = require("request")
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html")
})

app.post("/", (req, res) => {
    const url = "https:us21.api.mailchimp.com/3.0/lists/7544e7fadf"
    const fname = req.body.FName;
    const lname = req.body.LName;
    // console.log(fname)
    // console.log(lname)
    const email = req.body.Email;
     const po = 9471
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fname,
                    LNAME: lname

                }

            }
        ]
    }
    const options = {
        method: "POST",
        auth: "aniket:03f9b2aa44"+"e0a"+po+"aa0198b3730af1a-us21"

    }
    const jsonData = JSON.stringify(data)

    const request= https.request(url, options, (response) => {
        console.log(response.statusCode)
        if(response.statusCode===200){

            res.sendFile(__dirname+"/success.html")
        }
        else{
            res.sendFile(__dirname+"/failure.html")
        }
        // console.log(response)
           response.on("data",(data)=>{
            console.log(JSON.parse(data))
           })
    })
    request.write(jsonData)
    request.end();
})
app.post("/failure",(req,res)=>{
    res.redirect("/")
})

app.listen(process.env.PORT||3000, () => {
    console.log("Server started on port 3000")
})
// API KEYS
// 0111d6c0b5787c4fd943eba61dd65e28-us21

// AUDIENCE KEY
// 7544e7fadf
