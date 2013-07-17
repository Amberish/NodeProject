function hello()
{
	return 'world';
}
function add(a, b)
{
	return a+b;
}
function fact(a)
{
	if(a!=1)
	{
		c = a-1;
		var b = fact(c)*a;
		return b;
	}
	else
	{
		return 1;
	}
}
module.exports.hello = hello;
module.exports.addition = add;
module.exports.factorial = fact;