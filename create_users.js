function generateUser(){
    const n1 = ['alice', 'emma', 'erik', 'eric', 'peter', 'stina', 'umar', 'andreas', 'dennis', 'lina', 'fredrik', 'oskar', 'oscar', 'lisa', 'karolin', 'linn', 'liselotte', 'jacob', 'jakob', 'greta', 'david', 'per', 'petra', 'marie', 'ramtin', 'josefine', 'sanna', 'kristoffer', 'markus', 'sebastian', 'rikard', 'viktor', 'henrietta', 'evelina', 'anna', 'robert', 'jens', 'alexander', 'mimmi', 'christer', 'christian', 'tobias', 'maja', 'lars', 'klas', 'jonathan', 'jim', 'james', 'åke', 'joel', 'jolin', 'jolina', 'michael', 'malin', 'isabelle', 'calle', 'mahnor', 'samantha', 'kenneth', 'damon', 'jesper', 'rasmus', 'ola', 'filippa', 'dimas', 'emilia', 'henrik', 'lena', 'michaela', 'amelia', 'andré', 'joakim', 'joachim', 'matilda', 'kevin', 'kristian', 'annika', 'frida', 'hannes', 'sofie', 'lovisa', 'linda', 'martin', 'levi', 'vendela', 'anton', 'sara', 'sofia', 'oliver', 'oliva', 'ann', 'nellie'];
    const n2 = ['andersson', 'svensson', 'persson', 'mascik', 'holmstedt', 'langelotz', 'grönvall', 'qvarfordt', "thulin", 'öhman', 'rydenfalk', 'floberg', 'claesson', 'dahlbäck', 'carlsson', 'rosberg', 'tikka', 'jensen', 'lundberg', 'lindström', 'parvaneh', 'björklund', 'gunnervald', 'plumpuu', 'anderssen', 'frick', 'hjers', 'henningsson', 'flores', 'guneriusson', 'digerud', 'johansson', 'jansson', 'smith', 'ljungblad', 'moreau', 'gauffin', 'sandberg', 'gustavsson', 'klingesten', 'joelsson', 'raja', 'abrahamsson', 'ruthner', 'ekström', 'wikander', 'harvonen', 'roos', 'ödvall', 'trkulja', 'larsson', 'sveningsson', 'söderman', 'bellini', 'björk', 'edman', 'kleban', 'lager', 'hjalmarsson', 'vendelstrand', 'lybeck', 'beck', 'bäck', 'hällgren', 'hansson', 'wendin', 'jepsson', 'dotes', 'ahlberg', 'nalen', 'ekeroth', 'bersten', 'berggren', 'bengelsdorff', 'bellis', 'fagerlund', 'lund', 'nelson'];
    const mail_domain = ['@gmail.com', '@hotmail.com', '@yahoo.com', '@live.se', '@live.com', '@yahoo.se', '@outlook.com', '@inbox.com', '@hushmail.com'];

    let r1 = Math.floor(Math.random() * n1.length);
    let first_name = `${n1[r1]}`;

    let r2 = Math.floor(Math.random() * n2.length);
    let last_name = `${n2[r2]}`;

    let r3 = Math.floor(Math.random() * mail_domain.length);
    let email = `${first_name}.${last_name}${mail_domain[r3]}`.replace("-", "_")

    let profile_pics = ['p7FmrgH.jpg', 'wC5ETq0.jpg', 'LBy4WcJ.jpg', 'E3VsnEe.jpg']
    let r4 = Math.floor(Math.random() * profile_pics.length);
    let url = `https://i.imgur.com/${profile_pics[r4]}`

    first_name = first_name.charAt(0).toUpperCase() + first_name.slice(1);
    last_name = last_name.charAt(0).toUpperCase() + last_name.slice(1);

    return {
        first_name: first_name,
        last_name: last_name,
        email: email,
        url: url,
    }
};

function populateUserList(n) {
    let list = [];

    for(let i = 0; i < n; i++) {
        list.push(generateUser());
    }

    return list;
}

const Client = require("mongodb").MongoClient
const url = "mongodb://127.0.0.1:27017"

console.log('Connecting to MongoDB at', url)
Client.connect(url, { useNewUrlParser: true }, (err, client) => {
    if(err) {
        console.log(err)
        return true
    }

    const db = client.db("theWall")
    const collection = db.collection("users")
    let n = 50
    let data = populateUserList(n)

    console.log(`Connection asserted. Inserting ${n} user documents`)
    collection.insertMany(data, err => {
        if(err) {
            console.log(err)
            client.close()
            return true
        }
        console.log('Data inserted. Closing client...')
        client.close()
    })
})


