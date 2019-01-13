const fetch = require('node-fetch');

const base_url = 'https://memes-maker-28fe4.firebaseio.com/';
const meme_url = `${base_url}memes.json`;
const user_url = `${base_url}users.json`;

const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull
} = require('graphql');

const MemeType = new GraphQLObjectType({
  name: 'Meme',
  fields: _ => ({
    id: {type: GraphQLInt},
    title: {type: GraphQLString},
    image: {type: GraphQLString},
  })
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: _ => ({
    id: {type: GraphQLInt},
    username: {type: GraphQLString},
    email: {type: GraphQLString},
    address: {type: AddressType},
    phone: {type: GraphQLString},
    website: {type: GraphQLString},
    company: {type: CompanyType}
  })
});

const AddressType = new GraphQLObjectType({
  name: 'Address',
  fields: _ => ({
    street: {type: GraphQLString},
    suite: {type: GraphQLString},
    city: {type: GraphQLString},
    zipcode: {type: GraphQLString},
    geo: {type: GeoType}
  })
});

const GeoType = new GraphQLObjectType({
  name: 'Geo',
  fields: _ => ({
    lat: {type: GraphQLString},
    lng: {type: GraphQLString}
  })
});

const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: _ => ({
    name: {type: GraphQLString},
    catchPhrase: {type: GraphQLString}
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    memes: {
      type: new GraphQLList(MemeType),
      async resolve(parent, args) {
        const res = await fetch(meme_url);
        const data = await res.json();

        return Object.values(data).map(meme => meme);
      }
    },
    meme: {
      type: MemeType,
      args: {
        id: {type: GraphQLInt}
      },
      async resolve(parent, args) {
        const res = await fetch(meme_url);
        const data = await res.json();

        return Object.values(data).filter(meme => meme.id === args.id).pop();
      }
    },
    users: {
      type: GraphQLList(UserType),
      async resolve(parent, args) {
        const res = await fetch(user_url);
        const data = await res.json();

        return data;
      }
    },
    user: {
      type: UserType,
      args: {
        id: {type: GraphQLInt},
      },
      async resolve(parent, args) {
        const res = await fetch(`${user_url}/${args.id}`);
        const data = await res.json();

        return data;
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addMeme: {
      type: MemeType,
      args: {
        title: {type: new GraphQLNonNull(GraphQLString)},
        image: {type: new GraphQLNonNull(GraphQLString)}
      },
      async resolve(parent, {title, image}) {
        const id = Math.floor(Math.random() * Math.floor(19999));
        const meme = {id, title, image};
        const options = {
          method: 'post',
          body: JSON.stringify(meme),
          headers: {'Content-Type': 'application/json'}
        };

        const res = await fetch(meme_url, options);
        const data = await res.json();

        return data;
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
