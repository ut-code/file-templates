let timer = 0;
while (true) {
  console.log("Hello via Bun! timer:", timer);
  timer++;
  await Bun.sleep(1000);
}
