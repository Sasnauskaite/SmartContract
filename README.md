# SmartContract

# V0.1

Sukurta paprasta išmanioji sutartis, kuri veikia ,,on-line" įrankyje [REMIX IDE](https://remix.ethereum.org/#optimize=false&runs=200&evmVersion=null&version=soljson-v0.4.24+commit.e67f0147.js)

# Nesėkmės

Kadangi po daugelio nesėkmingų bandymų supratau, jog man vienai nepavyks visko gerai atlikti, dėl suvokimo stokos (man užduotis pasirodė per sunki arba aš jos gerai nesupratau) todėl dalį *smart contract* pasiėmiau iš [šio link'o](https://github.com/dappuniversity/defi_tutorial/releases/tag/starter-code).

Vėliau žingsnis po žingsnio viską atlikau sekdama [šį video](https://www.youtube.com/watch?v=CgXQC4dbGUE).

# Paleidimas

Norėdami paleisti programą turite turėti aplanką savo kompiuteryje, atsidaryti jį naudodami cmd, pasileisti *GANACHE* įrankį ir tuomet atlikti šiuos veiksmus:
1. Sukompiliuoti kontraktus naudojant komandą: `truffle compile`.
2. Perkelti sutartis:
   a. Naudojantis pirmą kartą: `truffle migrate`
   b. Naudojantis visus kitus kartus: `truffle migrate --reset'
3. Tuomet, pasileidus kitą terminalą, reikia paleisti serverį, tam, kad įsitikintume, jog svetainė veikia: `npm run start`
Jums atidarys Dapp langą jūsų naršyklęje. Tuomet jums tereikia prisijungti prie MetaMask įrankio naršyklėje ir programa pradės veikti!
   
# Testai

Norėdami lokaliai testuoti šią programą į terminalą rašykite: `truffle compile`
Kai programa bus sėkmingai sukompiliuota rašykite: `truffle console`
Tuomet pradėkite testą: `truffle test`
