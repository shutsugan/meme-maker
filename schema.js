const fetch = require('node-fetch');

const base_url = 'https://memes-maker-28fe4.firebaseio.com/';
const meme_url = `${base_url}memes.json`;
const user_url = `${base_url}users.json`;

const {
  GraphQLObjectType,
  GraphQLID,
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
    id: {type: GraphQLID},
    title: {type: GraphQLString},
    image: {type: GraphQLString},
  })
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: _ => ({
    id: {type: GraphQLID},
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
        const keys = Object.keys(data);

        return Object.values(data).map((meme, index) => {
          return {...meme, id: keys[index]}
        });
      }
    },
    meme: {
      type: MemeType,
      args: {
        title: {type: GraphQLString}
      },
      async resolve(parent, args) {
        const res = await fetch(meme_url);
        const data = await res.json();
        const keys = Object.keys(data);

        return Object.values(data)
          .filter((meme, index) => {
            if (meme.title === args.title) return {...meme, id: keys[index]};
          }).pop();
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
        id: {type: GraphQLID},
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
        const meme = {title, image};
        const options = {
          method: 'post',
          body: JSON.stringify(meme),
          headers: {'Content-Type': 'application/json'}
        };

        const res = await fetch(meme_url, options);
        const data = await res.json();

        return data;
      }
    },
    updateMeme: {
      type: MemeType,
      args: {
        id: {type: new GraphQLNonNull(GraphQLID)},
        title: {type: new GraphQLNonNull(GraphQLString)},
        image: {type: new GraphQLNonNull(GraphQLString)}
      },
      async resolve(parent, {id, title, image}) {
        //TODO: object structure shou
        const meme = {[id]: {title, image}};
        const options = {
          method: 'put',
          body: JSON.stringify(meme),
          headers: {'Content-Type': 'application/json'}
        };

        const res = await fetch(meme_url, options);
        const data = await res.json();
        console.log('=>', data);
        return data;
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
