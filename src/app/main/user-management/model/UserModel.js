import _ from '@lodash';

const UserModel = (data) =>
  _.defaults(data || {}, {
    avatar: null,
    background: null,
    name: '',
    emails: [{ email: '', label: '' }],
    contacts: [{ iso: 'us', contact: '', tag: '' }],
    title: '',
    organization: '',
    birthday: null,
    address: '',
    roles: []
  });

export default UserModel;
