import { Input } from "antd";
import React from "react";
import { Controller } from "react-hook-form";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { InputControlProps } from "../../type";

const InputControl = ({
  name,
  control,
  isPass,
  placeHolder,
  error,
}: InputControlProps) => {
  return (
    <> 
      <Controller
          name={name}
          control={control}
          render={({ field: { onChange, value } }) => (
            <div>
              {isPass ? (
                <>
                  <Input.Password
                    onChange={onChange}
                    value={value}
                    placeholder={placeHolder}
                    size="large"
                    allowClear
                    status={error && "error"}
                    className="h-[50px] md:h-[50px] md:text-base pl-8"
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                  />
                  {error && <p className="text-red-500">{error.message}</p>}
                </>
              ) : (
                <>
                  <Input
                    onChange={onChange}
                    value={value}
                    placeholder={placeHolder}
                    size="large"
                    allowClear
                    status={error && "error"}
                    className="h-[50px] md:h-[50px] md:text-base pl-8"
                  />
                  {error && <p className="text-red-500">{error.message}</p>}
                </>
              )}
          </div>
          )}
        />
      </>
  );
};

export default InputControl;
