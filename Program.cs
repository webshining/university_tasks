Console.OutputEncoding = System.Text.Encoding.UTF8;

// Task 1
double y = 0, x = Convert.ToInt32(Console.ReadLine());
if(x <= 4)
    y += (Math.Pow(x, 2)+5*x+1)/2;
else if(x < 16) {
    y = 1;
    for(int i = 5; i <= x; i++)
        y *= Math.Pow((1+Math.Pow(i, 3)), 2);
}
else if(x >= 16)
    for(int i = 16; i <= x; i++)
        y += Math.Pow((double)(2+i)/4, 2);
Console.WriteLine(y);

// Task 2
// foreach(char t in Console.ReadLine()) {
//     Console.WriteLine(t);
// }