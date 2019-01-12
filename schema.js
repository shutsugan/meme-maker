const fetch = require('node-fetch');

const base_url = 'https://memes-maker-28fe4.firebaseio.com/';
const meme_url = `${base_url}memes.json`;
const album_url = `${base_url}albums`;
const user_url = `${base_url}users`;

const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema
} = require('graphql');

const MemeType = new GraphQLObjectType({
  name: 'Meme',
  fields: _ => ({
    id: {type: GraphQLInt},
    title: {type: GraphQLString},
    image: {type: GraphQLString},
  })
});

const AlbumType = new GraphQLObjectType({
  name: 'Album',
  fields: _ => ({
    userId: {type: GraphQLInt},
    id: {type: GraphQLInt},
    title: {type: GraphQLString}
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
        const res = await fetch(`${meme_url}/${args.id}`);
        const data = await res.json();

        return data;
      }
    },
    albums: {
      type: new GraphQLList(AlbumType),
      async resolve(parent, args) {
        const res = await fetch(album_url);
        const data = await res.json();

        return data;
      }
    },
    album: {
      type: AlbumType,
      args: {
        id: {type: GraphQLInt}
      },
      async resolve(parent, args) {
        const res = await fetch(`${album_url}/${args.id}`);
        const data = await res.json();

        console.log('album', data);
        return data;
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

module.exports = new GraphQLSchema({query: RootQuery});
