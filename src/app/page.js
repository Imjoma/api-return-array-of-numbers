import { notFound } from "next/navigation";

export const getData = async () => {
  const res = await fetch("http://localhost:3000/api/getNumbers");
  if (!res.ok) {
    return notFound();
  }
  const data = await res.json();
  return data;
};

// ✔️ api call that return an array of numbers from 1 to 100
// ✔️ display the numbers, on each line
// ✔️ if the number is divisible by 3, it should say 'divisible by three' instead of the number
// ✔️ if the number is divisible by 5, it should say 'divisible by five' instead of the number
// ✔️ when both are true, both pieces of text should be on the line instead of the number

export default async function Home() {
  const numbers = await getData();

  return (
    <main className="flex flex-col gap-4">
      <h1>A Webpage that returns an array of numbers from 1-100</h1>
      <div>
        <ul className="space-y-2">
          <li>{"["}</li>
          {numbers.map((item, idx) => {
            const is3and5 = item % 3 === 0 &&
              item % 5 === 0 && {
                style: "font-mono bg-red-500",
                text: "divisible by three|divisible by five",
              };

            const is3 = item % 3 === 0 && {
              style: "font-mono bg-yellow-500",
              text: "divisible by three",
            };

            const is5 = item % 5 === 0 && {
              style: "font-mono bg-green-500",
              text: "divisible by five",
            };

            const itemMod = is3and5 ||
              is3 ||
              is5 || {
                style: "font-mono bg-gray-100",
                text: `${item}`,
              };

            const itemIs3and5 = itemMod.text.includes("|");

            return (
              <li key={item}>
                <div className="flex flex-row items-center space-x-4">
                  <span className="p-2">{item}</span>
                  <span>•</span>
                  <span
                    className={` p-4 ${
                      itemIs3and5 && "flex text-sm flex-col"
                    } ${itemMod.style} border rounded-full`}
                  >
                    {typeof itemMod.text === "string" && itemIs3and5
                      ? itemMod.text
                          .split("|")
                          .map((text, idx) => <span key={text}>{text}</span>)
                      : itemMod.text}
                  </span>
                </div>
              </li>
            );
          })}
          <li>{"]"}</li>
        </ul>
      </div>
    </main>
  );
}
