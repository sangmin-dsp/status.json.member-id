const express = require('express');

const app = express();

let members = require('./members');

app.get('/api/members/:id', (req, res) => {
    const { id } = req.params;
    const member = members.find((m) => m.id === Number(id));
    if (member) {
      res.send(member);
    } else {
      res.status(404).send({message: 'There is no such member'}); 
      // 요청한 정보가 없을 때 status(404) 
      // { } -> Api서버에는 문장 자체를 주는 것 보다, 
      // 하나의 json객체 안에 넣어서 보내주는 게 좋음 -> 추가 정보 확장에 편리
    }
 })


app.listen(3000, () => {
    console.log('Server is listening...')
});

