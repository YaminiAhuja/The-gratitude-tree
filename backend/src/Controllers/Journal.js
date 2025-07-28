import JournalModel from '../Model/Journal.js'
import UserModel from '../Model/User.js';


export async function getJournals(req,res){
    const userid = req.params.userid;
    try{
    const request = await JournalModel.find({userid : userid});
    res.status(200).json({
        message : "success",
        entry : request});
    }catch(error){
        console.log(error);
        return res.status(500).json({
            message : "server side error"
        })
    }
}
export async function postJournal(req,res){
    const userid = req.params.userid;
    const prompt = req.body.prompt;
    const entry = req.body.entry;
    if(!prompt || !entry){
       return res.status(400).json({
            message : "fill all details"
        })
    }
    try{
        const journal = new JournalModel({prompt: prompt,entry:entry, userid:userid});
        const result = await journal.save();
        return res.status(201).json({
            message : "successful"
        })
    
    }catch(error){
        console.log(error);
        return res.status(500).json({
            message : "server side error"
        })
    }

}

