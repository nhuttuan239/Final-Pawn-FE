import Link from "./Link";
import Card from "./Card";
import Tabs from "./Tabs";

function customizeComponentTheme(theme) {
  return { ...Tabs(theme), ...Card(theme), ...Link(theme) };
}
export default customizeComponentTheme;
