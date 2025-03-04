# Goals

To create Ukrainian monopoly, add educational component
about investment and basic money rules for society.

* Use our skills to create a project that can accumulate finance around it
* Project that brings happiness
* Support army and Ukraine
* Develop our culture and share it with the rest of the world
* Become stronger and independence
* Make people smarter

# Values

* Open-minded
* Fairness
* Truth
* Quality
* We are respect freedom, but you need to defend your ideas

## Features

1. User profile
2. Login
3. Sign up
4. Inventory - user items from boxes and prizes
5. Game - Main feature of the project, Monopoly game with different modes and features
6. Achievements
7. Friends
8. Game streams
9. Market - game items market where users can sell items from gained item or opened boxes
10. Conversations - user can send messages to his friend
11. Trades - P2P. User can exchange items
12. NFTs / Blockchain - make game as opportunity to earn money and develop our society with new one job
13. Tasks - daily tasks, weekly, monthly and annual tasks
14. Global chat / Forum - as nostalgia and interaction for people
15. Subscription - Probably few different type of subscription. Monetization aspect
16. Boxes and Keys - the second monetization aspect
17. Levels - user engagement about their progression and rewards
18. Ranked Mode - separate mode for experienced users
19. BI/BA - data for analyzing
20. Wallet - User can deposit and withdraw real money
21. Referrals - a way to invite new people with win to win strategy for users
22. Promo - promotion and engaging
23. Credit (in game) - basic functionality in the game for boosting its economic
24. Deposit (in game) - advanced feature in specific mode for educational purposes
25. Stocks (in game) - advanced feature in specific mode for educational purposes
26. Microloans (in game) - advanced feature in specific mode for educational purposes
27. Restrictions
28. School - Mono School - create a place where you can find courses, mentors and even opportunities to find a job
29. Journey, Game triggers - service which is responsible to reward a user with items and boxes on some event
30. Language support - MVP-1 Ua, Next En, etc
31. Currency support - MVP-1 UAH, Next USD or EUR looking at Trump :D, Next cryptocurrencies
32. To find solutions for different tasks, like math, programming, or simple business and optimization process tasks for
    increasing rent prize of your monopoly, and you can do it when other players are doing their steps

## Entities

* User - a real person that are registered in the system
* Player - user in game
* Room - special place where user waiting other players to start a game
* Dice - random roller to go over the tiles
* Tile - a cell on monopoly map
* Bank - game entity that responsible to give user money, give loans etc
* Player Property - purchased by player tiles, it can be single business or monopoly
* Inventory - user items from boxes and prizes
* Monopoly - a set of tiles of the same type
* Box - gacha box with random items
* Key - a key to open a box
* Star/House - upgrade monopoly tiles, possible to have 4 small stars
* Big start / Hotel - The fifth and last upgrade for monopoly tile

### Dices

* Single dice 1 - 6 - used in jackpot tile
* Double dice 1 - 6 x 1 - 6 - basic mode, equal values give you chance to go once more, but it can be only 3 times
* Triple dice 1 - 6 x 1 - 6 x 1 - 6 - drops randomly in fast game mode, equal numbers on tree dices give you chance to go on any tile
* Bus dice - Is special dice that can be used in fast mode for choosing where to go it drops randomly in fast game mode

## Game modes

* Regular mode - basic monopoly game. User goes, buys, upgrades and trades with other players
* Fast mode - monopoly with additional dice and even dice types like a bus,
* Special mode - additional features like deposits, stocks
* Predefined mode - all tiles are distributed over the players so need to exchange and built their monopolies
* Team mode 2 x 2

## MVP 1 features

* Basic game flow
    * Monopoly has map with different type of businesses kind of technologies, foods, drinks, etc
    * Player rolls a dice and go over tiles
    * Game has 40 tiles, among them Game tiles, Monopoly tiles, Special tiles and Corner tiles like Start, Jail, Parking
      etc
* User registration and login
* Creating a room with basic game mode
* To play

## Game rules

> Note all numbers are discussable

### Basic mode rules (POS)

* User create a room where he choose amount of players
* Amount of players can be between 2 and 5
* Also he can choose if the room automatically start the game
* Next when all required players are joined, game starts
* On the game beginning we need to initialize users with start money 15000 UAH (In game we will add k what means more
  money to achieve realistic money amount)
* All the players should appear on the first Tile which is called start
* All the players will have different colors due to separate their purchases
* Next player press button "Roll" and two dices rolling the number with amount of steps
* We will see animation as "Player" is going for rolled amount of steps
* According to last step user should do action of its "Tile"
* After, next player do his rolling
* "Player" can buy a empty tile, should pay rent if he hits another player tile. Price of rent depends on type of Tile
  and amount of "stars" of Monopoly
* On equal number on rolling user should go one more step, it can be repeated three times
* In game exists few types of Tiles. MonopolyTile, GameTile (Chance, Tax), CornerTile (Start, Jail/Parking,
  Portal/Jackpot, Go to jail)
* On chane user should get a card from predefined stack of cards, after card applying it should come to the end of deck
* Player can get a credit. Bank constantly gives a player 5000 UAH and Player should return in 10 rounds with 15% fee
  it's 5750
* Round is one rolling for user and all required actions like pay rent or pay for bank, if user gets something it is
  writing in kind of Logs window in the center of game
* Player can exchange with other, but there is limitation for "anti-cheat" reasons, so player cannot give money without
  exchange, sum of exchange should not be more than x2 for example Tile price is 1000 maximum user can give 2k, and
  minimum 500
* Player can give up
* The game is ended when everyone except one went bankrupt or gave up
* We are using only integer number in a game. All math actions should be rounded
* Make a bank in the game as Monobank :D
* Room should be deleted if all users left, or it's not active more than 20 minutes

### Fast game mode

* Starts after 10 rounds basic mode
* Can give user random set of dices like Triple dice, Double dice + Bus
