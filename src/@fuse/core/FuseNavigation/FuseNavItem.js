import { selectUser } from "app/store/userSlice";
import { useSelector } from "react-redux";

const components = {};

export function registerComponent(name, Component) {
  components[name] = Component;
}

export default function FuseNavItem(props) {
  const C = components[props.type];
  const user = useSelector(selectUser);

  const institutionTypeId = user?.data?.institutionType
    ? user?.data?.institutionType
    : "1";

  // {
  //   props.item.nomenclature === "Hospital" && console.log('hsptal')
  // }

  return props.item.id === "internet-Policies" ||
    props.item.institutionTypeId === institutionTypeId ? (
    <C {...props} />
  ) : (
    props.item.institutionTypeId == null && <C {...props} />
  );
}
