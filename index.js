import fs from "fs";
import cors from "cors";
import express from "express";
import * as dotenv from "dotenv";

const app=express();

dotenv.config()

app.use(cors());

const PORT = process.env.PORT

//1. Home Page 
app.get("/", (request, response) => {
    response.send("NODE FILESYSTEM TASK");
    response.json({
        message:`/create->To CREATE .txt file`
        })
  });
    

//2. Create .txt file
app.get("/create",function (request,response){
    const time=new Date();
    const fileName=time.getDate()+"-"+time.getMonth()+"-"+time.getFullYear()+" "+time.getHours()+"-"+time.getMinutes();    
    fs.writeFile(`${fileName}.txt`,`${time}`,()=>{
        console.log("File created Sucessfully")
    }
    );
    response.json({ message:`${fileName}.txt File Created `,
    fileName:`${fileName}.txt`,
            })
    
})
// 3. Read all txt_files

app.get("/read",function (request,response){
    let txt_files=[];
    fs.read(directoryName, function (error, files) {
        //error
        if (error) {
            return console.log('Unable to scan directory: ' + error);
        } 
        
        files.forEach(function (file) {
            if(file.end(".txt")){
                txt_files.push(file);
            }     
        });
        response.json({
            file_names:txt_files
        })
    });
    
})

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
