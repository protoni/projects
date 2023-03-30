---
title: Bash
date: "2020-07-28T23:28:03.284Z"
description: "Bash notes"
tags: ["linux"]
---


### Arrays
**add to array:**
```bash
# Declare a new array
arr=()

# Add some elements to it
arr+=('Hello ')
arr+=('World')

# Print out the elements
echo "Array: "${arr[0]} ${arr[1]}
```
```
Array: Hello World
```



**Get an array element with index number:**
```bash
# Declare a new array with 3 elements
arr=("1" "2" "3")

# Print out the elements by the index numbers
echo "Index 0: "${arr[0]}
echo "Index 1: "${arr[1]}
echo "Index 2: "${arr[2]}
```
```
Index 0: 1
Index 1: 2
Index 2: 3
```



**Get an array element with the key:**
```bash
# Create a new Associative array
declare -A arr2

# Set array keys
arr2=([first]=0 [second]=1 [third]=2)

# Print out the elements by the key
echo "Key first: "${arr2[first]}
echo "Key second: "${arr2[second]}
echo "Key third: "${arr2[third]}
```
```
Key first: 0
Key second: 1
Key third: 2
```



**Loop through all array items:**
```bash
# Declare a new array with 4 elements
arr=("1" "2" "3" "4")

# Loop through the whole array and print the elements
for i in "${arr[@]}"
do
   echo $i
done
```
```
1
2
3
4
```



**Loop through an array by calling the indexes:**
```bash
# Declare a new array with 4 elements
arr2=("1" "2" "3" "4")

# Initialize a new counter variable
counter=0

# Loop through the array and call each element with the counter as a index
for i in "${arr2[@]}"
do
     echo ${arr2[$counter]}
     ((counter++))
done
```
```
1
2
3
4
```



---

### File parameters


**Get the number of file parameters:**
```bash
#!/bin/bash
echo "Number of parameters: "$#
```
```
$ ./parameterTest.sh
Number of parameters: 0

$ ./parameterTest.sh param1
Number of parameters: 1
```



**Get the current filename:**
```bash
#!/bin/bash
echo "Current filename: "$0
```
```
$ ./parameterTest.sh
Current filename: ./parameterTest.sh
```



**Get the first parameter:**
```bash
#!/bin/bash
if [ $# -gt 0 ]; then
    echo "First paramater: " $1
else
    echo "0 parameters given"
fi
```
```
$ ./parameterTest.sh test1
First paramater:  test1

$ ./parameterTest.sh
0 parameters given
```



---

### File reading

**Load file contents to an array:**
```
####### testFile.txt #######
testRow1
testRow2
testRow3
############################
```
```bash
#!/bin/bash

# Set the filename to a variable
filename="testFile.txt"

# Declare a new array
content=()

# Load file content to the array
mapfile -t content < <( cat $filename )

# Get the array length
arr_length=${#content[@]}

# Print out the array length
echo "array length: "$arr_length

# Loop through the array and print the lines
for i in "${content[@]}"
do
   echo $i
done
```
```
$ ./fileReadTest.sh
array length: 3
testRow1
testRow2
testRow3
```



---

### Functions


**Use a global variable that was defined in a function:**
```bash
#!/bin/bash

# Define a new function
getWordGlobal() {
    ret="test1"
}

# Call the function
getWordGlobal

# Print out the variable that was declared in the function
echo "Global variable output: "$ret
```
```
$ ./globalFunc.sh
Global variable output: test1
```



**Use local variable that was declared in a function:**
```bash
#!/bin/bash

# Define a new function that returns a local variable
getWordLocal() {
    local ret="test2"
    echo "$ret"
}

# Call the function and get the local variable in return
ret=$(getWordLocal)

# Print out the local variable declared in the function
echo "Local variable output: "$ret
```
```
$ ./localFunc.sh
Local variable output: test2
```



**Use function parameters:**
```bash
#!/bin/bash

# Define a function that receives 1 parameter
getWordParam() {
    local ret="Hello"
    echo "$ret $1"
}

# Call the function with parameter 'World' and get the result in return
ret=$(getWordParam "World")

# Print out the result
echo "Parameter output: "$ret
```
```
$ ./getWordParam.sh
Parameter output: Hello World
```

---

**Return booleans from a function:**
```bash
#!/bin/bash

# Declare a new function that takes a parameter and returns a boolean
isZero() {
    if [ $1 -eq 0 ]; then
        true
    else
        false
    fi
}

# Call the function in an if statement with a parameter
if isZero 0 ; then
    echo "isZero 0 == 0: True"
else
    echo "isZero 0 == 0: False"
fi
```
```
$ ./retBool.sh
isZero 0 == 0: True
```


**Return numbers from a function:**
```bash
#!/bin/bash

# Define a function that returns a 0
getNumberZero() {
    local ret=0
    echo $ret
}

# Define a function that returns a 1
getNumberOne() {
    local ret=1
    echo $ret
}

# Define a function that gets one parameter and checks if it is a zero.
# Returns a false if the parameter is not zero.
isZero() {
    if [ $1 -eq 0 ]; then
        true
    else
        false
    fi
}

# Get a number 0 from the function
ret=$(getNumberZero)

# Check if the function return variable is zero
if isZero $ret; then
    echo "Get number Zero: True"
else
    echo "Get number Zero: False"
fi

# Get a number 1 from the function
ret2=$(getNumberOne)

# Check if the function return variable is zero again
if isZero $ret2; then
    echo "Get number One: True"
else
    echo "Get number One: False"
fi
```
```
$ ./retNum.sh
Get number Zero: True
Get number One: False
```



**Return arrays from a function:**
```
No practical way of returning arrays from functions in Bash.
```



**Use global variables in a function:**
```bash
#!/bin/bash

# Define a variable that prints out a global variable value
printRet() {
    echo "printRet() output: "$ret
}

# Define a global variable
ret="test_var"

# call the function the the variable
printRet ret
```
```
$ ./globalVarInFunc.sh
printRet() output: test_var
```



---

### If statements

**One if-condition:**
```bash
#!/bin/bash

# Define some variables with a numeric values
val1=1
val2=0

# Check if 'value 1' is greater that 'value 2' and print out the result
if [ $val1 -gt $val2 ]; then
    echo $val1" is greater than "$val2
else
    echo $val1" is not greater than "$val2
fi
```
```
$ ./isGreaterThan.sh
1 is greater than 0
```



**Two if-conditions:**
```bash
#!/bin/bash

# Define some variables with a numeric values
val1=1
val2=0
val3=1

# Check if 'value 1' is greater than 'value 2' or 'value 3'.
# And print out the result.
if [[ ( $val1 -gt $val2 ) || ( $val1 -gt $val3 ) ]]; then
    echo $val1" > "$val2" or "$val1" > "$val3
else
    echo $val1" <= "$val2" and "$val1" <= "$val3
fi
```
```
$ ./isGreaterThan.sh
1 > 0 or 1 > 1
```



**Four if-conditions:**
```bash
#!/bin/bash

# Define some variables with a numeric values
val1=1
val2=0
val3=1

# Check if 'value 1' is greater than 'value 2' and 'value3' 
# or if 'value 2' is greater than 'value 1' and 'value 3'
if [[ ( $val1 -gt $val2 && $val1 -gt $val3 ) || ( $val2 -gt $val1 && $val2 -gt $val3 ) ]]; then
    echo $val1" > "$val2" and "$val1" > "$val3 " or "$val2" > "$val1" and "$val2" > "$val3
else
    echo $val1" <= "$val2" and "$val1 " <= "$val3 " and "$val2" <= "$val1" and "$val2" <= "$val3
fi
```
```
$ ./isGreaterThan.sh
1 <= 0 and 1  <= 1  and 0 <= 1 and 0 <= 1
```



---

### Input

**Read user input from the shell:**
```bash
#!/bin/bash

# Print out the instructions for the user
echo "Type something:"

# Read the input with a prompt message '>'
read -p '>' input

# Print out the result
echo "You typed: "$input
```
```
$ ./getInput.sh
Type something:
>test1
You typed: test1
```



---

### Variables

**Increment a counter:**
```bash
#!/bin/bash

# Initialize a counter variable to 0
echo "Setting counter to 0"
counter=0;

# Increment the counter and print out the result
echo "Counter: "$counter
echo "Adding to counter"
counter=$((counter+1))

# Different ways the counter can be incremented
echo "Counter: "$counter
((counter=counter+1))
echo "Counter: "$counter
((counter+=1))
echo "Counter: "$counter
((counter++))
echo "Counter: "$counter
```
```
$ ./incrementCounter.sh
Setting counter to 0
Counter: 0
Adding to counter
Counter: 1
Counter: 2
Counter: 3
Counter: 4
```



**Subtract a counter:**
```bash
#!/bin/bash

# Initialize a counter variable and set the value to 4
echo "Setting counter to 4"
counter=4;

# Subtract from the counter and print out the result
echo "Subtracting from counter"
counter=$((counter-1))
echo "Counter: "$counter

# Different ways the counter can be subtracted
((counter=counter-1))
echo "Counter: "$counter
((counter-=1))
echo "Counter: "$counter
((counter--))
echo "Counter: "$counter
```
```
$ ./subtractCounter.sh
Setting counter to 4
Subtracting from counter
Counter: 3
Counter: 2
Counter: 1
Counter: 0
```



---

