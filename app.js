const express = require('express');

const app = express();

let members = require('./members');

app.use(express.json()); // middleware 설정 필요


app.get('/api/members', (req, res) => { 
  const { team } = req.query;
  if (team) {
    const teamMembers = members.filter((m) => m.team === team);
    res.send(teamMembers);
  } else {
    res.send(members);
  }
});


app.get('/api/members/:id', (req, res) => {
  const { id } = req.params;
  const member = members.find((m) => m.id === Number(id));
      if (member) {
        res.send(member);
      } else {
        res.status(404).send({message: 'There is no such member'}); 
     
      }
});

app.post('/api/members', (req, res) => {
  const newMember = req.body;
  members.push(newMember);
  res.send(newMember);
});

app.put('/api/members/:id', (req, res) => {
  const { id } = req.params;
  const newInfo = req.body;
  const member = members.find((m) => m.id === Number(id));
  if (member) {
    Object.keys(newInfo).forEach((prop) => {
      member[prop] = newInfo[prop];
    });
    req.send(member);
  } else {
    res.status(404).send({ message: 'There is no member with the id'});
  }
});

app.delete('/api/members/:id', (req, res) =>{
  const { id } = req.params;
  const membersCount = members.length;
  members = members.filter((member) => member.id !== Number(id));
  if (members.length < membersCount){
    res.send({ message: 'Deleted' });
  } else {
    res.status(404).send({ message: 'There is no member with the id'});
  }
})

app.listen(3000, () => {
    console.log('Server is listening...')
});

