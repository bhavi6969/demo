const ids = [
  'photo-1616683693504-3ea7e9ad6fec',
  'photo-1556228578-0d85b1a4d571',
  'photo-1579684385127-1ef15d508118',
  'photo-1620121692029-d088224ddc74',
  'photo-1516549655169-df83a0774514',
  'photo-1584515979956-d9f6e5d09982',
  'photo-1584308666744-24d5c474f2ae',
  'photo-1607613009820-a29f7bb81c04',
  'photo-1573883430697-4c3479aae6b9',
  'photo-1618005182384-a83a8bd57fbe',
  'photo-1576091160399-112ba8d25d1d',
  'photo-1505944270255-72b8c68c6a70',
  'photo-1522337360788-8b13dee7a37e',
  'photo-1556228720-195a672e8a03',
  'photo-1614859324967-bdf461fcf7ec',
  'photo-1551836022-d5d88e9218df',
  'photo-1527631746610-bca00a040d60',
  'photo-1601049676099-e7ed07d825b0',
  'photo-1532187640681-7335541ac76a',
  'photo-1576086213369-97a306d36557',
  'photo-1620802086300-3453b3b4f53f',
  'photo-1506126613408-eca07ce68773',
  'photo-1621508678033-6fb918a1a364',
  'photo-1605634598402-999335a963ba',
  'photo-1596755389378-c31d21fd1273',
  'photo-1519014816548-bf5fe059e98b'
];

async function checkUrls() {
  const valid = [];
  for (const id of ids) {
    try {
      const url = `https://images.unsplash.com/${id}?auto=format&fit=crop&w=600&q=80`;
      const res = await fetch(url, { method: 'HEAD' });
      if (res.ok) {
        console.log('Valid:', id);
        valid.push(id);
      } else {
        console.log('Invalid:', id, res.status);
      }
    } catch(e) {}
  }
}
checkUrls();
