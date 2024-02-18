const fs = require('fs');



//read

// fs.readFile('./docs/creativecoder.txt',(err,data) => {
//     if(err){
//         console.log(err)
//     }
// })


//write

// if(!fs.existsSync('./docs/creativecoder123.txt')) {

//     fs.writeFile('./docs/creativecoder123.txt','Hello World',(err) => {
//         if(err){
//             console.log(err)
//         }
//         console.log('after writing files');
//     })

// }else{
    
//     //delete
//     fs.unlink('./docs/creativecoder123.txt',(err) => {
//         if(err) {
//             console.log(err)
//         }
//         console.log('file deleted');
//     })
// }


if(fs.existsSync('./new-folder')){
//folder delete
    fs.rmdir('./new-folder',(err) => {
        if(err){
            console.log(err)
        }
        console.log('folder deleted');
    })

}else{
//folder create
    fs.mkdir('./new-folder',(err) => {
        if(err){
            console.log(err)
        }
        console.log('folder created');
    })
}








// console.log('latest line of codes');