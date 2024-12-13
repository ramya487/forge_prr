import Resolver from '@forge/resolver';

const resolver = new Resolver();

resolver.define('test', (req) => {
  console.log("resolver test")
  return "ok";
});

export const handler = resolver.getDefinitions();
