

##### Bitcoin questions and answers
````
# Transaction questions:

Question:
I was checking transactions in blockchain.info. I have some questions about transaction information about input and output addresses.

block address: https://blockchain.info/address/1NHv6qBxu6haWj8rqeLqw9eyJqm4JT26R6

    1. why some of transactions have one input and one output? They don't have any change transaction?
    2. If any transaction has two output, the second one is change transaction?
    3. can we see fee transactions in output address?
    4. Are multiple addresses in input part related to each address in wallet that has bitcoin?


Answer:

Q) why some of transactions have one input and one output?
A) A bitcoin transaction can have many inputs and many outputs. Bitcoin has a transaction oriented logic, where amounts are transferred from previous transactions. As an example (neglecting the fees): to be able to spend 1 bitcoin, when the wallet has 2 previous tx with amounts of 0.5 BTC, then a new tx is created with two inputs. Same logic would apply, if 4 previous tx existed, each @0.25 BTC. Then a tx with 4 inputs would be created. For the outputs: you can create tx with one or more outputs. E.g. faucets pay to many outputs, instead of creating single transactions - this saves on the fees.

Q) They don't have any change transaction?
A) If you are not the owner of a wallet, you cannot know, which is the "change". Normally you have an output address, and a return address (for the change, like in the second example of the screen shot). The transactions move from one pubkey to another pubkey address, and there we cannot see, which addresses belongs to the user's wallet, and which might be the change address. With this said, there are some activities to try to link addresses to real users. They create diagrams, and try to see the flow of tx, and derive the information. But when using addresses only once, you wouldn't loose your privacy...

Q) If any transaction has two output, the second one is change transaction?
A) not necessarily. I can send a transaction with 0.5 BTC to my brother, and 0.5 BTC to my sister. So there would be no change address.

Q) can we see fee transactions in output address?
A) hmm, no... Transaction fee is the difference between summary of input values and summary of output values. A usual case: you have one BTC, you send 0.5 to your brother, you send to your change address 0.4995, and the diff is the fees, which go to the miners.

Q) Are multiple addresses in input part related to each address in wallet that has bitcoin?
A) Not necessarily. The bitcoin network doesn't know about wallets, and its belonging addresses - this is a layer to make it more comfortable for the endusers. The bitcoin network works with transactions, moving funds from address(es) to address(es). No wallet information is included. So multiple input parts can belong to different wallets.

A good overview of transactions is here: 
https://en.bitcoin.it/wiki/Transaction
and of course in Andreas' book "Mastering Bitcoin", which is also online available:
http://shop.oreilly.com/product/0636920049524.do


From:
https://bitcoin.stackexchange.com/questions/74003/multiple-input-and-output-addresses-in-bitcoin-transactions
````


##### Eclair close uncooporative channel
````
1. Download DnsChanger from play store
2. run DnsChanger on mobile
3. configure DnsChanger:
    DNS1: 54.227.38.238
    DNS2: 8.8.4.4
4. activate DnsChanger
5. open browser and go to http://eclair.dns ( not https )
6. restart eclair
7. funds should appear soon
8. if funds appeared as on chain transaction, DnsChanger can be closed

# If funds are not appearing yet. Wait another 144 blocks and redo 
previous steps
````

##### Setup lightning network node
````bash
# Good guide on how to setup lightning network node
https://github.com/Stadicus/guides/blob/master/raspibolt/README.md
````