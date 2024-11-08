import { Input } from "antd";
import { TypeEntitiesInput } from "../../type";

export default function MyTextField(type?: TypeEntitiesInput) {
  return (
    <div>
      <Input placeholder={type?.name} />
    </div>
  );
}
