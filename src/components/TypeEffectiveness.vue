<template>
  <div class="typeEffectiveness">
    
  </div>
</template>

<script>
import { RepositoryFactory } from "@/repositories/repositoryFactory";

const pokeApi = RepositoryFactory.get("pokeApi");

export default {
  name: "TypeEffectiveness",
  props: {
    typing: Array,
  },
  data() {
    return {
      types: [],
      typingData: [],
      damageMap: {
            double_damage_from: 2,
            half_damage_from: 0.5,
            no_damage_from: 0
      }
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    async fetch() {
        var { data } = await pokeApi.getAllTypes();
        this.types = data.results;
        
        var { data } = await pokeApi.getType(this.typing[0].type.name);
            this.typingData.push(data);

        if (this.typing.length > 1) {
            var { data } = await pokeApi.getType(this.typing[1].type.name);
            this.typingData.push(data);
        }
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="css">
.typeEffectiveness {
}

/* Damage Relations Data */
.dmg-box {
  display: flex;
  flex-direction: column;

  text-align: center;

  padding: 0 0.25rem;
}

[class*="dmg-type-"] {
  min-width: 2.7rem;
  border-radius: 0.625rem 0.625rem 0 0;
  padding: 0.2rem 0;
  margin-bottom: 0.12rem;
}

.dmg-num {
  border-radius: 0 0 0.625rem 0.625rem;
  padding: 0.2rem 0;
}

.dmg-type-normal {
  border: 2px solid #a8a878;
  color: #6d6d4e;
}
.dmg-type-fire {
  border: 2px solid #f08030;
  color: #9c531f;
}
.dmg-type-fighting {
  border: 2px solid #c03028;
  color: #7d1f1a;
}
.dmg-type-water {
  border: 2px solid #6890f0;
  color: #445e9c;
}
.dmg-type-flying {
  border: 2px solid #a890f0;
  color: #6d5e9c;
}
.dmg-type-grass {
  border: 2px solid #78c850;
  color: #4e8234;
}
.dmg-type-poison {
  border: 2px solid #a040a0;
  color: #682a68;
}
.dmg-type-electric {
  border: 2px solid #f8d030;
  color: #a1871f;
}
.dmg-type-ground {
  border: 2px solid #e0c068;
  color: #927d44;
}
.dmg-type-psychic {
  border: 2px solid #f85888;
  color: #a13959;
}
.dmg-type-rock {
  border: 2px solid #b8a038;
  color: #786824;
}
.dmg-type-ice {
  border: 2px solid #98d8d8;
  color: #638d8d;
}
.dmg-type-bug {
  border: 2px solid #a8b820;
  color: #6d7815;
}
.dmg-type-dragon {
  border: 2px solid #7038f8;
  color: #4924a1;
}
.dmg-type-ghost {
  border: 2px solid #705898;
  color: #493963;
}
.dmg-type-dark {
  border: 2px solid #705848;
  color: #49392f;
}
.dmg-type-steel {
  border: 2px solid #b8b8d0;
  color: #787887;
}
.dmg-type-fairy {
  border: 2px solid #ee99ac;
  color: #9b6470;
}

.dmg-0 {
  background-color: #2e3436;
  color: #ffdd57;
}
.dmg-¼ {
  background-color: #7c0000;
  color: #ffdd57;
}
.dmg-½ {
  background-color: #a40000;
  color: #ffdd57;
}
.dmg-1 {
  background-color: white;
  color: white;
}
.dmg-2 {
  background-color: #4e9a06;
  color: #ffdd57;
}
.dmg-4 {
  background-color: #73d216;
  color: #ffdd57;
}
</style>
