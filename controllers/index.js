const cheerio=require('cheerio'); /* get html page data using cheerio */

const request = require('request');

const obj={};

const arr=[];

var chessHtml=''

const result = request("https://www.chessgames.com/chessecohelp.html", (err, response, html)=>{
        chessHtml=html
        const $ = cheerio.load(html);

            /* getting the maove name and value from the page  */
            $("body > font > p > table > tbody > tr > td > font").each((index, element) => {
                arr.push($(element).text()); /* storing all data in the array */
            });


            /*the loop range is from 0 to 1000*/
            for(var i=0; i<1000; ){

                obj[arr[i]]=arr[i+1]
                i+=2 /* loop by 2 in which we get the name and move value */
            }
         
    });  


/*for getting the html file */
const getPage= async (req, res) => {
        try {
            
            res.status(200).send(chessHtml)
        }

        catch (error) {
            res.status(404).json({message: error.message})
        }
    }


/*for get the move name and value by the move code */
const getMoves=async ( req, res)=>{
    try {
        const code=req.params.code
        if(obj[code]){
        const name=obj[code].split('1') /* spliting the values by 1 ..before 1 we  get the name and after we get the move value */
        const MoveName=name[0];
        const MoveValue= `1${name[1]}`;

        console.log("name:- ",MoveName);
        console.log("moveCode:- ",MoveValue);

        res.status(200).send(`<h2>${MoveName}</h2>\n<h4>${MoveValue}</h4>`) /* sending the name and value as response */
     }else{
         res.status(404).send(`<h1>Please enter a valid code.<h1>`)
     }
     }
    catch (error) {
        res.status(400).json({message: error.message})
    }
    

}

module.exports ={getPage, getMoves}