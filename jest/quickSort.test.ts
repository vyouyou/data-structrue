import generate from "../src/quickSort";

const array = [8,9,7,2,2,4];

generate(array);

test("test quick sort",()=>{
    expect(array + "").toBe("2,2,4,7,8,9");
})