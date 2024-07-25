
# Programming patterns

## Description
Notes of the book 'Design Patterns: Elements of Reusable Object-Oriented Software'
You can build and run the examples here: <https://github.com/protoni/programming-patterns/tree/main>


## Creational Patterns

These patterns deal with object creation mechanisms, trying to create objects 
in a manner suitable to the situation. The patterns under this category include:

##### Abstract Factory
- Provides an interface for creating families of related or 
  dependent objects without specifying their concrete classes.
- <https://github.com/protoni/programming-patterns/blob/main/CreationalPatterns/AbstractFactory/main.cpp>

##### Builder
- Separates the construction of a complex object from its representation.
- <https://github.com/protoni/programming-patterns/blob/main/CreationalPatterns/Builder/main.cpp>

##### Factory Method
- Defines an interface for creating an object but allows subclasses to
    alter the type of objects that will be created.
- <https://github.com/protoni/programming-patterns/blob/main/CreationalPatterns/FactoryMethod/main.cpp>

##### Prototype
- Specifies the kinds of objects to create using a prototypical 
  instance and creates new objects by copying this prototype
- <https://github.com/protoni/programming-patterns/blob/main/CreationalPatterns/Prototype/main.cpp>

##### Singleton
- Ensures a class has only one instance and provides a global point of access to it.
- <https://github.com/protoni/programming-patterns/blob/main/CreationalPatterns/Singleton/main.cpp>


## Structural Patterns

These patterns deal with object composition or the way objects are put together to 
form larger structures. The patterns include:

##### Adapter
- Converts the interface of a class into another interface clients expect
- <https://github.com/protoni/programming-patterns/blob/main/StructuralPatterns/Adapter/main.cpp>

##### Bridge
- Decouples an abstraction from its implementation so that the two can vary independently.
- <https://github.com/protoni/programming-patterns/blob/main/StructuralPatterns/Bridge/main.cpp>

##### Composite
- Composes objects into tree structures to represent part-whole hierarchies.
- <https://github.com/protoni/programming-patterns/blob/main/StructuralPatterns/Composite/main.cpp>

##### Decorator
- Adds additional responsibilities to an object dynamically.
- <https://github.com/protoni/programming-patterns/blob/main/StructuralPatterns/Decorator/main.cpp>

##### Facade
- Provides a unified interface to a set of interfaces in a subsystem.
- <https://github.com/protoni/programming-patterns/blob/main/StructuralPatterns/Facade/main.cpp>

##### Flyweight
- Uses sharing to support a large number of fine-grained objects efficiently.
- <https://github.com/protoni/programming-patterns/blob/main/StructuralPatterns/Flyweight/main.cpp>

##### Proxy
- Provides a surrogate or placeholder for another object to control access to it.
- <https://github.com/protoni/programming-patterns/blob/main/StructuralPatterns/Proxy/main.cpp>

## Behavioral Patterns

These patterns focus on communication between objects, how objects interact and 
fulfill their responsibilities. The patterns include:

##### Chain of Responsibility 
- Passes a request along a chain of handlers.
- <https://github.com/protoni/programming-patterns/blob/main/BehavioralPatterns/ChainOfResponsibility/main.cpp>

##### Command
- Encapsulates a request as an object, thereby allowing for parameterization of 
  clients with queues, requests, and operations.
- <https://github.com/protoni/programming-patterns/blob/main/BehavioralPatterns/Command/main.cpp>

##### Interpreter
- Defines a representation for a language's grammar and uses an interpreter to 
  deal with this grammar.
- <https://github.com/protoni/programming-patterns/blob/main/BehavioralPatterns/Interpreter/main.cpp>

##### Iterator
- Provides a way to access the elements of an aggregate object sequentially 
  without exposing its underlying representation.
- <https://github.com/protoni/programming-patterns/blob/main/BehavioralPatterns/Iterator/main.cpp>

##### Mediator
- Defines an object that encapsulates how a set of objects interact.
- <https://github.com/protoni/programming-patterns/blob/main/BehavioralPatterns/Mediator/main.cpp>

##### Memento
- Captures and externalizes an object's internal state so that the object can be 
  restored to this state later.
- <https://github.com/protoni/programming-patterns/blob/main/BehavioralPatterns/Memento/main.cpp>

##### Observer
- Defines a one-to-many dependency between objects so that when one object changes state,
  all its dependents are notified and updated automatically.
- <https://github.com/protoni/programming-patterns/blob/main/BehavioralPatterns/Observer/main.cpp>

##### State
- Allows an object to alter its behavior when its internal state changes.
- <https://github.com/protoni/programming-patterns/blob/main/BehavioralPatterns/State/main.cpp>

##### Strategy
- Defines a family of algorithms, encapsulates each one, and makes them interchangeable.
- <https://github.com/protoni/programming-patterns/blob/main/BehavioralPatterns/Strategy/main.cpp>

##### Template Method
- Defines the skeleton of an algorithm in the superclass but lets subclasses override 
  specific steps of the algorithm without changing its structure.
- <https://github.com/protoni/programming-patterns/blob/main/BehavioralPatterns/TemplateMethod/main.cpp>

##### Visitor
- Represents an operation to be performed on the elements of an object structure without 
  changing the classes on which it operates.
- <https://github.com/protoni/programming-patterns/blob/main/BehavioralPatterns/Visitor/main.cpp>