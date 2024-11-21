import _ from '@lodash';

const OrgModel = (data) =>
  _.defaults(data || {}, {
    address:{ 
      address_line1:'',
      address_line2:'',
      city:'',
      country:'',
      state:'',
      zip_code:''
    },
    email: '',
    name: '',
    status: '',
    website:'',
    category:null,
    contacts: [{contact: "", tag: "",iso:""}],
    status:"ACTIVE"
  });

export default OrgModel;
