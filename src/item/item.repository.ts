import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemConsumable, ItemWearable } from './item.entity';
import { ConsumableType, ItemType, WeaponType, ArmorType } from './item-type.enum';

@Injectable()
export class ItemRepository {
  constructor(
    private readonly datasource: DataSource,
    @InjectRepository(ItemConsumable)
    private readonly itemConsumableRepository: Repository<ItemConsumable>,
    @InjectRepository(ItemWearable)
    private readonly itemWearableRepository: Repository<ItemWearable>,
  ) {}

  async getItemArmor(armorType?: ArmorType): Promise<ItemWearable[]> {
    const qb = this.itemWearableRepository.createQueryBuilder('item');

    qb.where('item.itemType = :itemType', { itemType: ItemType.Armor });
    if (armorType) {
      qb.andWhere('item.wearableType = :armorType', { armorType });
    }

    qb.orderBy('item.wearableType', 'ASC');
    qb.addOrderBy('item.itemGrade', 'ASC');

    return await qb.getMany();
  }

  async getItemWeapon(weaponType?: WeaponType): Promise<ItemWearable[]> {
    const qb = this.itemWearableRepository.createQueryBuilder('item');

    qb.where('item.itemType = :itemType', { itemType: ItemType.Weapon });
    if (weaponType) {
      qb.andWhere('item.wearableType = :weaponType', { weaponType });
    }

    qb.orderBy('item.wearableType', 'ASC');
    qb.addOrderBy('item.itemGrade', 'ASC');

    return await qb.getMany();
  }

  async getItemConsumable(consumableType?: ConsumableType): Promise<ItemConsumable[]> {
    const qb = this.itemConsumableRepository.createQueryBuilder('item');

    if (consumableType) {
      qb.where('item.consumableType = :consumableType', { consumableType });
    }

    qb.orderBy('item.consumableType', 'ASC');
    qb.addOrderBy('item.itemGrade', 'ASC');

    return await qb.getMany();
  }

  async updateItemConsumable(items: ItemConsumable[]): Promise<void> {
    const qr = this.datasource.createQueryRunner();
    await qr.connect();
    await qr.startTransaction();
    try {
      await qr.manager.getRepository(ItemConsumable).delete({});
      await qr.manager.getRepository(ItemConsumable).insert(items);
      await qr.commitTransaction();
    } catch (e) {
      await qr.rollbackTransaction();
    } finally {
      await qr.release();
    }
  }

  async updateItemWeapon(items: ItemWearable[]): Promise<void> {
    const qr = this.datasource.createQueryRunner();
    await qr.connect();
    await qr.startTransaction();
    try {
      await qr.manager.getRepository(ItemWearable).delete({ itemType: ItemType.Weapon });
      await qr.manager.getRepository(ItemWearable).insert(items);
      await qr.commitTransaction();
    } catch (e) {
      await qr.rollbackTransaction();
    } finally {
      await qr.release();
    }
  }

  async updateItemArmor(items: ItemWearable[]): Promise<void> {
    const qr = this.datasource.createQueryRunner();
    await qr.connect();
    await qr.startTransaction();
    try {
      await qr.manager.getRepository(ItemWearable).delete({ itemType: ItemType.Armor });
      await qr.manager.getRepository(ItemWearable).insert(items);
      await qr.commitTransaction();
    } catch (e) {
      await qr.rollbackTransaction();
    } finally {
      await qr.release();
    }
  }
}
