
export default async function handler(request: Request) {
  // if (request.method !== 'POST') {
  //   return new Response(null, { status: 405 })
  // }
  // send inngest event here
  return new Response(null, {
    status: 200,
  });
}
