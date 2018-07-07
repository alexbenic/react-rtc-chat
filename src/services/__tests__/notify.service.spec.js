import Notify from "../notify.service";
import each from "jest-each";
import randombytes from "randombytes";

const user = name => {
  return {
    id: randombytes(8).toString("hex"),
    nick: name,
    stream: { write: jest.fn(val => JSON.parse(val)) },
    app: 1
  };
};

const m = ({ sender, text }) => {
  return {
    id: randombytes(8).toString("hex"),
    sender: user(sender),
    message: text
  };
};

// prettier-ignore
each([
  [['zvrk', 'maci'], m({ sender: 'zvrk', text: 'hello' })],
  [['zvrk', 'maci', 'backo'], m({ sender: 'maci', text: 'Conastik!' })],
  [['zvrk', 'maci', 'cone'], m({ sender: 'cone', text: 'Bauuu' })]
]).test('service notifies all users: %j with message: message: %j', (nicks, msg) => {
  const service = new Notify()
  const users = nicks.map(nick => user(nick))

  service.notify(users, msg)

  const sentMessage = {
    type: 2,
    value: {
      id: expect.any(String),
      sender: {
        id: expect.any(String),
        nick: msg.sender.nick,
        stream: {},
        app: 1
      },
      message: msg.message
    }
  }

  users.forEach(user => {
    expect(user.stream.write).toHaveBeenCalledTimes(1)
    const parsedMessage = JSON.parse(user.stream.write.mock.calls[0])
    expect(parsedMessage).toEqual(sentMessage)
  })

})
