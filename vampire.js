class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let result= 0;
    let curVamp = this;
    while (curVamp.creator) {
      curVamp = curVamp.creator;
      result++;
    }
    return result;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    if (this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal) {
      return true;
    }
    return false;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    let vamp1 = this;
    let vamp2 = vampire;
    while (vamp2) {
      if (vamp1.numberOfVampiresFromOriginal > vamp2.numberOfVampiresFromOriginal) {
        while (vamp1.numberOfVampiresFromOriginal > vamp2.numberOfVampiresFromOriginal) {
          vamp1 = vamp1.creator;
        }
      } else if (vamp1.numberOfVampiresFromOriginal < vamp2.numberOfVampiresFromOriginal) {
          while (vamp1.numberOfVampiresFromOriginal < vamp2.numberOfVampiresFromOriginal) {
            vamp2 = vamp2.creator;
          }
      } else {
        if (vamp1.name === vamp2.name) {
          return vamp1;
        } else {
          vamp2 = vamp2.creator;
        }
      }
    }
  }
}

module.exports = Vampire;