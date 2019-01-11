const base_url = 'https://jsonplaceholder.typicode.com/';
const meme_url = `${base_url}photos`;
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
    albumId: {type: GraphQLInt},
    id: {type: GraphQLInt},
    title: {type: GraphQLString},
    url: {type: GraphQLString},
    thumbnailUrl: {type: GraphQLString}
  })
});

const AlbumType = new GraphQLObjectType({
  name: 'Album',
  fields: _ => ({
    userId: {type: GraphQLInt},
    id: {type: GraphQLInt},
    title: {type: GraphQLString},
    meme: {type: MemeType}
  })
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: _ => ({
    id: {type: GraphQLInt},
    username: {type: GraphQLString},
    email: {type: GraphQLString},
    eddress: {type: AddressType},
    phone: {type: GraphQLInt},
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
    lat: {type: GraphQLInt},
    lng: {type: GraphQLInt}
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

        console.log('memes', data);
        return data;
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

        console.log('meme', data);
        return data;
      }
    },
    albums: {
      type: new GraphQLList(AlbumType),
      async resolve(parent, args) {
        const res = await fetch(album_url);
        const data = res.json();

        console.log('Albums', data);
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
        const data = res.json();

        console.log('users', data);
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

        console.log('user', data);
        return data;
      }
    }
  }
});

module.exports = new GraphQLSchema({query: RootQuery});
