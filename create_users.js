function generateUser(){
  n1 = ['alice', 'emma', 'erik', 'eric', 'peter', 'stina', 'umar', 'andreas', 'dennis', 'lina', 'fredrik', 'oskar', 'oscar', 'lisa', 'karolin', 'linn', 'liselotte', 'jacob', 'jakob', 'greta', 'david', 'per', 'petra', 'marie', 'ramtin', 'josefine', 'sanna', 'kristoffer', 'markus', 'sebastian', 'rikard', 'viktor', 'henrietta', 'evelina', 'anna', 'robert', 'jens', 'alexander', 'mimmi', 'christer', 'christian', 'tobias', 'maja', 'lars', 'klas', 'jonathan', 'jim', 'james', 'åke', 'joel', 'jolin', 'jolina', 'michael', 'malin', 'isabelle', 'calle', 'mahnor', 'samantha', 'kenneth', 'damon', 'jesper', 'rasmus', 'ola', 'filippa', 'dimas', 'emilia', 'henrik', 'lena', 'michaela', 'amelia', 'andré', 'joakim', 'joachim', 'matilda', 'kevin', 'kristian', 'annika', 'frida', 'hannes', 'sofie', 'lovisa', 'linda', 'martin', 'levi', 'vendela', 'anton', 'sara', 'sofia', 'oliver', 'oliva', 'ann', 'nellie'];


  n2 = ['andersson', 'svensson', 'persson', 'mascik', 'holmstedt', 'langelotz', 'grönvall', 'qvarfordt', "thulin", 'öhman', 'rydenfalk', 'floberg', 'claesson', 'dahlbäck', 'carlsson', 'rosberg', 'tikka', 'jensen', 'lundberg', 'lindström', 'parvaneh', 'björklund', 'gunnervald', 'plumpuu', 'anderssen', 'frick', 'hjers', 'henningsson', 'flores', 'guneriusson', 'digerud', 'johansson', 'jansson', 'smith', 'ljungblad', 'moreau', 'gauffin', 'sandberg', 'gustavsson', 'klingesten', 'joelsson', 'raja', 'abrahamsson', 'ruthner', 'ekström', 'wikander', 'harvonen', 'roos', 'ödvall', 'trkulja', 'larsson', 'sveningsson', 'söderman', 'bellini', 'björk', 'edman', 'kleban', 'lager', 'hjalmarsson', 'vendelstrand', 'lybeck', 'beck', 'bäck', 'hällgren', 'hansson', 'wendin', 'jepsson', 'dotes', 'ahlberg', 'nalen', 'ekeroth', 'bersten', 'berggren', 'bengelsdorff', 'bellis', 'fagerlund', 'lund', 'nelson'];
  
  
  mail_domain = ['@gmail.com', '@hotmail.com', '@yahoo.com', '@live.se', '@live.com', '@yahoo.se', '@outlook.com', '@inbox.com', '@hushmail.com'];

  r1 = Math.floor(Math.random() * n1.length);
  first_name = `${n1[r1]}`;
  

  r2 = Math.floor(Math.random() * n2.length);
  last_name = `${n2[r2]}`;

  r3 = Math.floor(Math.random() * mail_domain.length);
  email = `${first_name}.${last_name}${mail_domain[r3]}`.replace("-", "_")
  
  profile_pics = ['', '', '', '']
  r4 = Math.floor(Math.random() * profile_pics.length);
  url = `${profile_pics[r4]}`

  return {
    first_name: first_name,
    last_name: last_name,
    email: email,
    url: url,
  }

};


