export default async function test() {
  const fd = new FormData();
  fd.append('name', 'Test User');
  fd.append('email', 'test@example.com');
  fd.append('attachment', new Blob(['test content'], { type: 'text/plain' }), 'test.txt');
  try {
    const res = await fetch('http://localhost:3000/api/apply', {
      method: 'POST',
      body: fd
    });
    console.log(res.status, await res.text());
  } catch (err) {
    console.error(err);
  }
}
test();
