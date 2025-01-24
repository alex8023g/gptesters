export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  console.log('searchParams:', searchParams);
  // const res = await fetch('https://data.mongodb-api.com/...', {
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'API-Key': process.env.DATA_API_KEY,
  //   },
  // })
  // const data = await res.json()

  // return Response.json({ data })
}
