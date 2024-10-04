
export default async function handler(request: Request) {
  // if (request.method !== 'POST') {
  //   return new Response(null, { status: 405 })
  // }
  // send inngest event here
  console.log('conf => ', config)
  return new Response(JSON.stringify(config), {
    status: 200,
  });
}