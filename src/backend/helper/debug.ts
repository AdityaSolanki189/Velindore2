

export const dump = (...datas: any[]) => {
  console.log('\n🪵 Debug Dump -------------------------');
  datas.forEach((data, index) => {
    console.log(`\n[${index + 1}]`, data);
  });
  console.log('--------------------------------------\n');
};


