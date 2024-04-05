import { type AggregateRootInterface, BaseEntity, type EmailValueObject, type IdValueObject, type NameValueObject, type TaxIdValueObject, type TaxPayerIdValueObject } from '@modules/shared'

interface Input {
  id?: IdValueObject
  name: NameValueObject
  email: EmailValueObject
  document: TaxIdValueObject | TaxPayerIdValueObject
  createdAt?: Date
  updatedAt?: Date
}

export class FarmerEntity extends BaseEntity implements AggregateRootInterface {
  private readonly _name: NameValueObject
  private readonly _email: EmailValueObject
  private readonly _document: TaxIdValueObject | TaxPayerIdValueObject

  constructor ({ id, name, email, document, createdAt, updatedAt }: Input) {
    super(id, createdAt, updatedAt)
    this._name = name
    this._email = email
    this._document = document
  }

  get name (): NameValueObject {
    return this._name
  }

  get email (): EmailValueObject {
    return this._email
  }

  get document (): TaxIdValueObject | TaxPayerIdValueObject {
    return this._document
  }
}
