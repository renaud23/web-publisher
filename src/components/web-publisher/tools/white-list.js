const TYPES = {
  string: {
    typeOf: "string",
    required: false,
    isRequired: { typeOf: "string", required: true }
  },
  number: null
};

const arrayOf = () => ({
  equired: false,
  isRequired: {
    required: true
  }
});
const shape = args => ({ ...args });

const Paragraphe = shape({ contenu: TYPES.string.isRequired });

const Paragraphes = shape({ components: arrayOf({ Paragraphe }).isRequired });

const Titre = shape({ contenu: TYPES.string.isRequired });

const COMPONENTS = {
  Paragraphe,
  Paragraphes,
  Titre
};

export default COMPONENTS;
