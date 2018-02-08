const users = {};

const respondJSON = (request, response, data, code) => {
  response.writeHead(code, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(data));
  response.end();
};

const respondJSONHead = (request, response, code) => {
  response.writeHead(code, { 'Content-Type': 'application/json' });
  response.end();
};

const addUsers = (request, response, params) => {
  if (!params.name || !params.age) {
    const message = { message: 'Invalid Parameters' };
    return respondJSON(request, response, message, 400);
  } else if (users[params.name]) {
    users[params.name].age = params.age;
    return respondJSONHead(request, response, 204);
  }
  users[params.name] = {};
  users[params.name].name = params.name;
  users[params.name].age = params.age;

  const message = { message: 'User Sucessfully Created' };
  return respondJSON(request, response, message, 201);
};

const getUsers = (request, response, isHead) => {
  if (isHead) {
    return respondJSONHead(request, response, 200);
  }
  const message = { message: JSON.stringify(users) };
  return respondJSON(request, response, message, 200);
};

const notReal = (request, response, isHead) => {
  if (isHead) {
    return respondJSONHead(request, response, 404);
  }
  const message = { message: 'Requested item not Found' };
  return respondJSON(request, response, message, 404);
};

module.exports.addUsers = addUsers;
module.exports.getUsers = getUsers;
module.exports.notReal = notReal;

