var _; // globals

describe("About Applying What We Have Learnt", function() {
  var products;

  beforeEach(function () { 
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {
    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {
      var productsICanEat = [];

      /* solve using filter() & all() / any() */
      productsICanEat = products.filter(function(pizza) {
        if (pizza["containsNuts"] === false) {
          for (ingredient in pizza["ingredients"]) {
            if (pizza["ingredients"][ingredient] === "mushrooms") {
              return false;
            }
          }
          return true;          
        }
        else {
          return false;
        }
      });

      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {
    var sum = 0;

    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }
    
    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {
    var sum = _(_.range(1,1000)).chain()
      .filter(function(num) {
        return num % 3 === 0 || num % 5 === 0;
      })
      .reduce(function(sum,x) {
        return sum + x;
      })
      .value();    /* try chaining range() and reduce() */

    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    /* chain() together map(), flatten() and reduce() */
    _(products).chain()
      .map(function(pizza) {
        return pizza["ingredients"];
      })
      .flatten()
      .reduce(function(sum, ingredient) {
        ingredientCount[ingredient] = (ingredientCount[ingredient] || 0) + 1;
      });

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR ADVANCED */
  
  it("should find the largest prime factor of a composite number", function () {
    var largestPrime = function(num) {
      var curr = num;
      var i = 2;
      while (i < curr) {
        if (curr % i === 0) {
          curr--;
          i = 2;
        }
        else {
          i++;
        }
      }
      return curr;
    };

    expect(largestPrime(22)).toBe(19);
  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {
    var largestPalindrome = function(num1, num2) {
      var product = (num1 * num2).toString().split("");      
      var copy = product.slice();
      var curr;
      var hash = {};
      var num;

      var findPalindrome = function(num) {
        var compare = num.length-1;
        for (var k = 0, len = num.length; k < len/2; k++) {
          if (num[k] !== num[compare]) {
            num.pop();
            return findPalindrome(num);
          }
          compare--;
        }
        return +num.join("");
      }
       
      // shift each first number of product and check if the remains contain a palindrome
      for (var i = 0, len = product.length; i < len; i++) {
        num = copy.slice();
        curr = findPalindrome(num);
        if (typeof curr === "number") {
          hash[curr] = curr;
        }
        copy.shift();
      }

      return +Object.keys(hash).sort(function(a,b) { return b-a;})[0];
    };

    expect(largestPalindrome(185, 606)).toBe(11211);
    expect(largestPalindrome(310, 681)).toBe(1111);
  });

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
    var smallestDivisible = function(limit) {
      var result = 20;
      var found = false;
  
      while(!found) {
        for (var i = limit; i > 0; i--) {
          if (result % i !== 0) {
            result += limit;
            break;
          }
          else if (i === 1) {
            found = true;
          }
        }
      }
      return result;
    };

    expect(smallestDivisible(20)).toBe(232792560);
  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {
    var diff = function(a, b) {
      var sumOfSquares = Math.pow(a, 2) + Math.pow(b, 2);
      var squareOfSums = Math.pow(a + b, 2);
      var difference = Math.abs(sumOfSquares - squareOfSums);
      return difference;
    }
  });

  // it("should find the 10001st prime", function () {
    
  // });
  
});
