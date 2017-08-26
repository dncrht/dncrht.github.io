---
layout: post
title: The illusion of TDD
---

In my view, TDD has become a mirage, an illusion. Something that everybody claim they do or see, but doesn't actually exist.

For starters, let's remember what TDD stands for: <span class="red">T</span>est <span class="green">D</span>riven <span class="refactor">D</span>evelopment (pay attention to the colours chosen here, you'll find out later)

It means that writing tests will drive how you write software, or in other words, the implementation. Very simple 2-step process, isn't it?

1. Write the **test**
2. Write the **implementation**

In practical terms, the test is defining the behaviour of your implementation, resulting in that neat feature will appear on a web browser, that [script that computes your tax returns](https://gist.github.com/dncrht/e76d3e29c9e172e71b63e77a881e9e98), whatever…

TDD hence implies you have a **clear understanding of the behaviour**. Because you've **written the requirements beforehand**, it allows you to write better code by **freezing the requirements**. You only **change one thing at a time**: either the behaviour or the code but not both.

It allows you to catch errors. Because the test will fail if the implementation is not correct. It creates reliable software because you **catch errors before** they happen.

This process of writing test first is known as the _red-green-refactor_ mantra.

- <span class="red">red</span> ☛ test is written, you run it and it fails
- <span class="green">green</span> ☛ you write an implementation that makes the test pass
- <span class="refactor">refactor</span> ☛ you either ship that implementation, or come back to optimise it

Let's see this in detail:

- <span class="red">red</span> ☛ you write a test with the specifications you know, you run this test and it fails. Obviously, you don't have an implementation.
- <span class="green">green</span> ☛ you write an implementation that makes the test pass. Write code, run the test, still red, write more code, debug, whoops it works!
- <span class="refactor">refactor</span> ☛ probably your implementation is not best, you can refactor it and you'll be sure it complies with the specification as long as tests are still green. Feel free to optimise your code now. This is the right moment.

## What's not TDD?

We've said TDD ensures you understand the requirements and the purpose and allows you to write better code by freezing the requirements. It forces you into a process known as red-green-refactor.

So… then what is not TDD? Following the definition we've given, the main condition to do TDD with all the benefits highlighted before, is to have tests driving your development. Sounds naïve, yeah.

TDD traditionally means tests are written first. TDD is often seen as a tight procedure. It's **here to help, not a mean by itself**. This has to be seen in a broader sense. Tests are written first because you have a **clear understanding** on what to test in terms of inputs, outputs and side effects.

Sometimes tests are not easy written upfront. Sometimes you prefer to fiddle with your classes, files or architecture. If you can't write your tests before the implementation, it's fine if you write them at the same time as the implementation. TDD as a practice ensures you **understand the requirements** and the purpose of your code, rather than the code itself. Once those are clear the implementation code emerges naturally afterwards, or at worst, at the same time you write tests.

When tests are written afterwards, you don't do TDD, you do something like nil-green-rage. The implementation that does what's intended is written in first place. Manually tested most of the times. Then a spec is written, usually testing the implementation and getting lost in implementation details, missing the feature's big picture. You know, can't see the forest because the trees. Then the last stage: rage. It won't appear immediately, but some time after. Precisely when you need to refactor the code and bring value. Code is usually [never static](/2016/09/09/make-it-work-make-it-pretty.html).

**TDD is not**:

- having tests to see if the code works
- having quick tests
- ensuring one and only one implementation, by tying tests to the implementation

Some testing smells that tell you are not doing TDD:

> The cost of writing a test usually exceeds the cost of writing the implementation.

You wrote the code and now you think about your tests. You create a big scaffolding of clever mocks, doubles and fake objects. The resulting test is anything but clear.

> An implementation change results in a cascade of test changes.

Test drives implementation, not the other way around! You can't trust tests if you have to rewrite them. A brittle test suite manifests when a tiny implementation change results in a cascade of tests needing a change.

> Test code looks like the implementation in RSpec language.

This is classic tight coupling. You've just written your code twice. And you can't change one without touching the other.

No TDD (tests written after the implementation) combined with white box testing usually ends up **reducing your opportunities to refactor to a minimum**.

## What is preventing TDD?

At this point we're starting to grok what's preventing us to do TDD. Several reasons have popped up, but kind of gravitates around two concepts:

- white box testing

<p class="center-image"><img src="https://ae01.alicdn.com/kf/HTB1.ve3OVXXXXaEapXXq6xXFXXXT/High-Quality-Acrylic-font-b-Hand-b-font-font-b-Crank-b-font-Musical-font-b.jpg" alt="see through cover" width="600px"/></p>

<p class="caption">More than white, transparent.</p>

It implies you see the internals of the box, you see how it works, thus you tie your test to your implementation. White box perverts TDD because you leave the understanding of the behaviour behind (by testing the implementation instead of the behaviour).

An analogy of bad testing would be winding up the lever, I release it, then I expect this to rotate, I expect this to move, etc… instead of I wind up the lever, I expect it to produce music.

- early optimisation

A usual suspect when facing computing problems. Test are written to be fast without assessing whether that's really a problem. Eg: method expectations are added to avoid hitting an allegedly slow database.

## Testing antipatterns in practice

I'll present how white box testing and early optimisations render a test suite useless, hindering the trust on tests to catch errors and your ability to refactor.

### Private method testing

As an example of white box testing, here we're testing the email is sent:

{% highlight ruby %}
# app/services/item_creation_service.rb
class ItemCreationService
  def initialize(item)
    @item = item
  end

  def call
    return false unless @item.save
    send_email
    post_on_twitter
    true
  end

  private

  def send_email
    # relevant code
  end

  def post_on_twitter
    # relevant code
  end
end

# spec/services/item_creation_service_spec.rb
describe ItemCreationService do
  describe '#send_email' do
    it 'sends a confirmation email' do
      # calls subject.send(:send_email)
    end
  end

  describe '#post_on_twitter' do
    it 'posts the item on twitter' do
      # calls subject.send(:post_on_twitter)
    end
  end
end
{% endhighlight %}

You interact with a class via the public interface in terms of inputs and outputs. Sending an email is a side effect of the primary purpose of the class. Testing `send_email` or `post_on_twitter` will make a lot harder to refactor your implementation because you'll have to change tests too. And please do not "be clever" by making it public so you don't break the rule.

The counter argument is _"but I don't know if it works!"_.

Instead, test side effects via `ActionMailer::Base.deliveries` or a specific ActiveJob has been queued. You own the implementation, you can always add logging and debug.

### Stubbing the methods of the class under test

Using the same service object as in the example above, ItemCreationService, we present this nasty example:

{% highlight ruby %}
# spec/services/item_creation_service_spec.rb
describe ItemCreationService do
  describe '#call' do
    let(:item) { double(save: true) }
    subject { described_class.new(item) }

    it 'works' do
      expect(subject).to receive :send_email
      expect(subject).to receive :post_on_twitter

      subject.call
    end
  end
end
{% endhighlight %}

Here you're not even unit testing your code. The test looks like the implementation written in RSpec, line by line: save, then send, then post… Not using the model either.

The test may be super quick but has no value: you trust it sends an email because calls the method. Blind faith on whatever happens on those methods, which, by the way, you can't refactor without modifying the test too.

### Object not in sync with expectations

The problem with replacing real objects with fake objects is they have to be in perfect sync, otherwise the test will pass and in real life the feature won't work. When **abusing doubles and method expectations** you're **not testing any actual code**, you're testing RSpec.

Here we can see another example of white box testing, and early optimisation: a simple model with a simple controller, backed by a simple test.

{% highlight ruby %}
# app/controllers/items_controller.rb
class ItemsController < ApplicationController
  def create
    @item = Item.new(item_params)
    if @item.save
      redirect_to items_path, notice: 'Item successfully created'
    else
      render 'new'
    end
  end
end

# app/models/item.rb
class Item < ActiveRecord::Base; end

# spec/controllers/items_controller_spec.rb
describe ItemsController do
  it 'redirects when saved successfully' do
    allow_any_instance_of(Item).to receive(:save).and_return(true)

    post :create, params: {item: {name: 'Book', price: '10'}}

    expect(response).to redirect_to items_path
  end
end
{% endhighlight %}

`allow_any_instance_of(Item).to receive(:save).and_return(true)` pretends to save time by not hitting the database.

However later on we add a validation to the model such as:

{% highlight ruby %}
# app/models/item.rb
class Item < ActiveRecord::Base
  validates :name, length: {minimum: 4}
end
{% endhighlight %}

We rerun the controller test above, and it passes. We try this in real life, and doesn't work.

How to avoid it? By making the test to hit the model rather than the method expectation:

{% highlight ruby %}
# spec/controllers/items_controller_spec.rb
describe ItemsController do
  it 'redirects when saved successfully' do
    post :create, params: {item: {name: 'Book', price: '10'}}

    expect(response).to redirect_to items_path
  end
end
{% endhighlight %}

_"But I added a validation, I know I'll have to change tests"_, you might argue. Yes, the code is under our control, however the abuse of method expectations could be out of your control, in dependencies.

Not convinced? Read another example:

{% highlight ruby %}
# app/controllers/items_controller.rb
class ItemsController < ApplicationController
  def show
    @item = Item.find_by_id(params[:id])
  end
end

# spec/controllers/items_controller_spec.rb
describe ItemsController do
  it 'fetches the item to display' do
    allow_any_instance_of(Item).to receive(:find_by_id).and_return(Item.new)

    get :show, params: {id: '1'}

    expect(assigns(:item)).to be_an Item
  end
end
{% endhighlight %}

`allow_any_instance_of(Item).to receive(:find_by_id)` pretends to save time by not hitting the database.

At a later point, we upgrade activerecord and dynamic finders are deprecated and removed. `find_by_id` no longer works in real life, however the test is still green.

Avoid this by letting the controller test hit the DB, regardless _how_.
This other test fails after the gem upgrade, pointing you into the right direction: update the controller code.

{% highlight ruby %}
# spec/controllers/items_controller_spec.rb
describe ItemsController do
  it 'fetches the item to display' do
    get :show, params: {id: '1'}

    expect(assigns(:item)).to be_an Item
  end
end
{% endhighlight %}

Clearly nobody upgrades gems so lightly, but it's likely you wouldn't have caught this any other way than manual testing. You are unaware you need to change the implementation and your tests are not helping you to catch errors, which will slow down release cycles.

And yet another example of doubles not in sync with real objects usually happens when testing views. Your presenter has a certain method, and instead of sending the presenter to the view test, you send a double. Later on, you remove that method from the presenter and the test still pass while the view doesn't render anymore in real life.

As you can see, there are countless examples where **this testing approach will bite you back**.

### Testing the wrong things

Tests must give you **confidence to change the implementation without fear of breaking things**. Here the controller calls a service object in charge of updating the item:

{% highlight ruby %}
# app/controllers/items_controller.rb
class ItemsController < ApplicationController
  def update
    item_updater = ItemUpdater.new(item_params).call
    @item = item_updater.item
    if item_updater
      redirect_to item_path(@item.id), notice: 'Item successfully updated'
    else
      render 'edit'
    end
  end
end

# spec/controllers/items_controller_spec.rb
describe ItemsController do
  it 'redirects when updated successfully' do
    allow_any_instance_of(ItemUpdate).to receive(:call).and_return(true)

    patch :update, params: {id: '1', item: {price: '11'}}

    expect(response).to redirect_to item_path('1')
  end
end
{% endhighlight %}

Later on we decide the service object is a bit overengineered, and we want to replace the controller code for something more basic such as:

{% highlight ruby %}
  def update
    @item = Item.find params[:id]
    if @item.update_attributes(items_params)
      redirect_to item_path(@item.id), notice: 'Item successfully updated'
    else
      render 'edit'
    end
  end
{% endhighlight %}

Because the `ItemUpdate` expectation, the test forces us to use the previous implementation, and now will fail. Test and implementation are tied, disallowing refactors. You have to change now two orthogonal moving pieces: test & implementation.

We must think about the bigger picture, and test accordingly. What would be the desired result (output) of the user interaction (input)?
Nothing else but _an item is updated in the database_. Regardless how's that implemented, via a service object or not.

If you're testing the wrong things, even having 100% test coverage means your app is **still undertested**.

## How can you achieve TDD?

By approaching your future implementation as a **black box**, and testing it so. Black box as opposed to white box. Black box is a functional analogy: imagine your feature is coded inside a black box, which you cannot open or see how it works. you can only interact with it via inputs and outputs (or side effects, for a less pure functional approach). I know, stoping thinking what happens inside is a huge mindset switch, and not always achievable (eg: test that interact with 3rd party services).

The beauty of black box testing is you can achieve the "refactor" part in <span class="red">R</span><span class="green">G</span><span class="refactor">R</span>. You'll be able to rewrite your implementation and use a simpler, faster one, and the behaviour will be the same. Remember the example before with the service object, or when extracting scattered code into a class.

As we said, if an implementation change implies a test change, you'll never know if your test is still valid. Again:

> Change one thing at a time.

Change your implementation, keep your tests stable.

### Why all this abuse of doubles or mocks?

For speed optimisation, often applied too early, and also because the concept of **testing in isolation** applied wrong.

Allegedly, it tries to **minimise the number of moving pieces**, good, by replacing them by predictable mocks, wrong. What happens in practice is the double/mock will lose sync with the real object, rendering you tests worthless.

The legit reason for minimising moving pieces is to achieve **predictability on the tested class**, _not_ on the collaborating classes. Tests should reflect real life behaviour, and things **don't run isolated in real life**.

If you want to minimise the number of moving pieces, test a happy path of that collaborating object instead of replacing it by a mock.

### Not all implementation code deserves a test

A black-box approach also means all tests have an integrationist _test-everything_ point of view. Popular knowledge dictates those tests are slow and you should have few of them. I agree: in a pure perfect world all tests would test the application from the user point of view only, because they run in 0 time and take 0 time to write.

In practical terms we have the **pyramid of tests**. A base of numerous quick tests, that test the widest number of cases, with upper levels of less, slower tests.

Coming back to `app/services/item_creation_service.rb` above, if the test is…:

{% highlight ruby %}
# spec/services/item_creation_service_spec.rb
describe ItemCreationService do
  describe '#call' do
    it 'fails saving an item' do
      expect(
        described_class.new(Item.new(name: 'bad')).call
      ).to be false
    end

    it 'successfully saves an item' do
      expect(
        described_class.new(Item.new(name: 'good')).call
      ).to be true
    end
  end
end
{% endhighlight %}

And that covers all validation scenarios for Item, do we need to test Item validation independently on Item spec? We don't: **not all code deserves testing**, if it's tested somewhere else.

We definitely should add more validation cases on `spec/models/item_spec.rb` in case they're many, so we only test happy good/bad paths on item_creation_service_spec (the service object is slower to test than the model) and a wide range of scenarios in item_spec, shaping the aforementioned pyramid of testing.

## Downsides

A black box approach is **slower** because it touches real systems. Thus people tend to take shortcuts to speed up testing. These shortcuts hinder blackbox testing by peeking into the implementation details, and replacing them with mocks, stubs and method expectations.

One solution to reduce test time and keep the black box approach is to add more CI workers. Clearly adding more workers have a direct, measurable increase in cost. But the cost in development time is hard to account and thus is perceived as a _better solution_, which is not. Another solution could be using objects in memory such `FactoryGirl.build` rather than `.create` than don't hit the disk. Or even the repository pattern, so the database is replaced by a memory store during tests.

In this sense, remember:

> developer cost 💰💰 > machine cost 💰

But sadly quantifying machine time is easier than quantifying dev time. Time saved in test time with early optimisations will be **paid later in longer rewriting times**.

Rewriting time is hard to quantify, so people tend to focus on optimising the former. However you're only hindering future refactors.

Engineering done right means you _can_ still use method expectations and doubles, but only in special occasions, not as first approach, eg: when testing third party libraries or HTTP requests.
You can minimise the effect of the double not in sync with the object by using [verifying doubles](https://relishapp.com/rspec/rspec-mocks/docs/verifying-doubles) (instance_double and class_double instead of double), but won't save you from method expectations' sync losses.
Only if there's a measurable improvement in test times. Is it 2 seconds out of 15 minutes? Is it 1 minute out of 15? Always a tradeoff between…

> Test time vs Ability to refactor

Choose wisely. Think of your future self.

## Wrapping up

A bunch of concepts have been repeated quite few times over and over. Concepts and bad practices to avoid the TDD illusion by **practicing actual, useful TDD**, and benefitting from it.

If you're not doing it already, you'd better change the way you write tests, keeping the following tenets always in mind:

- Tests should **describe the behaviour**.
- Tests should consider **code as black boxes**.
- Tests should be **clear**.
- Tests should be **simple**.
- Tests should be **explicit**.

…with all their implications too; eg: clear & explicit means no need to be DRY on tests.

Or in a sentence:

> Tests should **describe** the system's **behavior** as **explicitly** as possible.
