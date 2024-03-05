import { useForm } from "@mantine/form";
import { Box, Button, Flex, Input } from "@mantine/core";
import { IMaskInput } from "react-imask";
import { ChangeEvent } from "react";

function App() {
  const form = useForm({
    initialValues: {
      name: "",
      lastName: "",
      phone: "",
      email: "",
    },
    validate: {
      name: (value) => (!value ? "Please enter a valid first name" : null),
      lastName: (value) => (!value ? "Please enter a valid last name" : null),
      phone: (value) => (!value ? "Please enter a valid phone number" : null),
      email: (value) => (!value ? "Please enter a valid email address" : null),
    },
    validateInputOnBlur: true,
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const unmaskedValue = event.target.value.replace(/[^0-9]+/g, "");
    form.setValues({
      phone: unmaskedValue,
    });
  };

  return (
    <Box p={50}>
      <Flex direction="column" gap={15}>
        <Input.Wrapper label={"name"} error={form.errors.name}>
          <Input {...form.getInputProps("name")} />
        </Input.Wrapper>
        <Input.Wrapper label={"lastName"} error={form.errors.lastName}>
          <Input {...form.getInputProps("lastName")} />
        </Input.Wrapper>

        <Input.Wrapper label={"phone"} error={form.errors.phone}>
          <Input
            {...form.getInputProps("phone")}
            component={IMaskInput}
            onAccept={(value) => {
              handleInputChange({ target: { value } });
            }}
            mask={"+7 (000) 000 00 00"}
          />
        </Input.Wrapper>

        <Input.Wrapper label={"email"} error={form.errors.email}>
          <Input {...form.getInputProps("email")} />
        </Input.Wrapper>
        <Button
          type={"submit"}
          onClick={(e) => {
            e.preventDefault();
            console.log(form.values);
          }}
        >
          Done
        </Button>
      </Flex>

      {JSON.stringify(form.values)}
    </Box>
  );
}

export default App;
