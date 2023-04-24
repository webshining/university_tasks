Console.OutputEncoding = System.Text.Encoding.UTF8;

string[] text = Console.ReadLine()!.Split(" ");
Array.Reverse(text);
Console.WriteLine(String.Join(" ", text));