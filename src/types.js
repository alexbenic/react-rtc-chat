import PropTypes from "prop-types";

const User = PropTypes.shape({
  id: PropTypes.string.isRequired,
  nick: PropTypes.string.isRequired,
  stream: PropTypes.object,
  app: PropTypes.oneOf([1, 2]) /* EnumApp */
});

const Users = PropTypes.arrayOf(User);

const Message = PropTypes.shape({
  id: PropTypes.string,
  sender: PropTypes.objectOf(User),
  message: PropTypes.string
});

const Messages = PropTypes.arrayOf(Message);

const Stats = PropTypes.shape({
  angular: PropTypes.number,
  react: PropTypes.number
});

export { User, Users, Message, Messages, Stats };
